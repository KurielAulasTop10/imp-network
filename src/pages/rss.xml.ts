import type { APIRoute } from "astro";
import RSS from "rss";
import { createClient } from "@/prismicio";

export const GET: APIRoute = async () => {
	const siteUrl = import.meta.env.SITE_URL || "https://imperionetwork.fr/";

	const feed = new RSS({
		title: "Império Network",
		description: "Feed oficial da Império Network",
		generator: "RSS for Astro",
		feed_url: `${siteUrl}rss.xml`,
		site_url: siteUrl,
		managingEditor: "imperiogames2019@gmail.com (Bruno Ramos)",
		webMaster: "aventuraland23@gmail.com (Bruno Ramos)",
		copyright: `Copyright ${new Date().getFullYear().toString()}, Império Network`,
		language: "pt-BR",
		pubDate: new Date().toUTCString(),
		ttl: 60,
	});

	const client = createClient();
	const allPosts = await client.getAllByType("post", {
		limit: 12,
		orderings: {
			field: "my.post.data",
			direction: "desc",
		},
	});

	if (allPosts) {
		for (const post of allPosts) {
			feed.item({
				title: post.data.titulo as string,
				description: post.data.titulo as string,
				url: `${siteUrl}post/${post.uid}`,
				categories: post.tags || [],
				date: post.data.data as string,
			});
		}
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
