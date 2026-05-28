import type { APIRoute } from "astro";
import { createClient } from "@/prismicio";

export const GET: APIRoute = async ({ url }) => {
	const page = Math.max(1, Number(url.searchParams.get("page") || "1"));

	const clientPrismic = createClient();
	const result = await clientPrismic.getByType("post", {
		page,
		pageSize: 21,
		orderings: { field: "my.post.data", direction: "desc" },
		fetchLinks: ["author.avatar", "author.banner", "author.descricao"],
	});

	return new Response(
		JSON.stringify({
			posts: result.results,
			totalPages: result.total_pages,
		}),
		{
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
			},
		},
	);
};
