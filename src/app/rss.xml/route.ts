"use server";

import RSS from "rss";
import { createClient } from "@/prismicio";

export async function GET() {
	const feed = new RSS({
		title: "Império Network",
		description: "Feed oficial da Império Network",
		generator: "RSS for Node and Next.js",
		feed_url: `${process.env.SITE_URL}rss.xml`,
		site_url: process.env.SITE_URL as string,
		managingEditor: "imperiogames2019@gmail.com (Bruno Ramos)",
		webMaster: "aventuraland23@gmail.com (Bruno Ramos)",
		copyright: `Copyright ${new Date()
			.getFullYear()
			.toString()}, Império Network`,
		language: "pt-BR",
		pubDate: new Date().toUTCString(),
		ttl: 60,
	});

	const client = createClient({ fetchOptions: { next: { revalidate: 1750 } } });

	const allPosts = await client.getAllByType("post", {
		limit: 12,
		orderings: {
			field: "my.post.data",
			direction: "desc",
		},
	});

	if (allPosts) {
		allPosts.map((post) => {
			feed.item({
				title: post.data.titulo as string,
				description: post.data.titulo as string,
				url: `${process.env.SITE_URL}post/${post.uid}`,
				categories: post.tags || [],
				date: post.data.data as string,
			});
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
