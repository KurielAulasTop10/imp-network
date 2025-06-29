"use server";

import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

export default async function sitemap() {
	const client = createClient();
	const allPosts = await client.getAllByType("post");
	const sitemap: MetadataRoute.Sitemap = [];

	for (const post of allPosts) {
		sitemap.push({
			url: `${process.env.SITE_URL}post/${post.uid}`,
			lastModified: new Date(post.last_publication_date),
		});
	}

	return sitemap;
}
