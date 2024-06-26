"use server";

import { createClient } from "@/prismicio";
import type { MetadataRoute } from "next";

export default async function sitemap() {
	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
		fetchOptions: {
			cache: "no-cache",
		},
	});
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
