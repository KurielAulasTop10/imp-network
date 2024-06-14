import { getRecordMap, mapImageUrl } from "@/libs/notion";
import redis from "@/libs/redis";
import type { Post } from "@/types/post";

interface PropertyValues {
	[key: string]: unknown;
}

export async function getAllPostsFromNotion() {
	const cachedPosts = await redis.get("allPosts");
	if (cachedPosts) return JSON.parse(cachedPosts) as Post[];

	const allPosts: Post[] = [];
	const recordMap = await getRecordMap(
		process.env.NOTION_DATABASE_ID as string,
	);
	const { block, collection } = recordMap;
	const schema = Object.values(collection)[0].value.schema;
	const propertyMap: Record<string, string> = {};

	for (const key of Object.keys(schema)) {
		propertyMap[schema[key].name] = key;
	}

	Object.keys(block).forEach((pageId) => {
		const pageValue = block[pageId].value;
		if (
			pageValue &&
			pageValue.type === "page" &&
			(pageValue.properties as PropertyValues) &&
			(pageValue.properties as PropertyValues)[propertyMap.Slug]
		) {
			try {
				const { properties, last_edited_time } = pageValue;

				const published =
					properties[propertyMap.Published][0][0] === "Yes" || false;
				if (!published) return 0;
				const contents = block[pageId].value.content || [];
				const dates = contents.map((content) => {
					return block[content]?.value?.last_edited_time;
				});
				dates.push(last_edited_time);
				dates.sort((a, b) => b - a);
				const lastEditedAt = dates[0];

				const id = pageId;
				const slug = properties[propertyMap.Slug][0][0] || "undefined";
				const title = properties[propertyMap.Page][0][0] || "undefined";
				const categories = properties[propertyMap.Category][0][0]
					.toLowerCase()
					.split(",") || ["Games"];
				let cover = "";
				try {
					cover = properties[propertyMap.Cover][0][1][0][1];
				} catch (error) {
					console.log(error);
				}
				const date =
					properties[propertyMap.Date][0][1][0][1].start_date || new Date();
				const author = properties[propertyMap.Author][0][0] || "Kuriel";

				allPosts.push({
					id,
					title,
					slug,
					categories,
					cover: mapImageUrl(cover, block[pageId].value) || "",
					date,
					published,
					lastEditedAt,
					author,
				});
			} catch (err) {
				return;
			}
		}
	});
	await redis.setex("allPosts", 300, JSON.stringify(allPosts));
	return allPosts;
}
