import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
	return new Response(JSON.stringify({ revalidated: true, now: Date.now() }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
