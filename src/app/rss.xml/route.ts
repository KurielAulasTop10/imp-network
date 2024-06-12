import RSS from "rss";
import { getAllPostsFromNotion } from "@/services/posts";

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

	const allPosts = await getAllPostsFromNotion();

	if (allPosts) {
		allPosts
			.sort((postA, postB) => (postA.date > postB.date ? -1 : 1))
			.splice(0, 12)
			.map((post) => {
				feed.item({
					title: post.title,
					description: post.title,
					url: `${process.env.SITE_URL}posts/${post.id}`,
					categories: post.categories || [],
					author: post.author,
					date: post.date,
				});
			});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
