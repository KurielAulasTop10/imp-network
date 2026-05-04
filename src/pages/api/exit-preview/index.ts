import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect }) => {
	return redirect("/", {
		headers: {
			"Set-Cookie": "astro-preview=; Path=/; Max-Age=0",
		},
	});
};
