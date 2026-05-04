import type { APIRoute } from "astro";
import { createClient } from "@/prismicio";

export const GET: APIRoute = async ({ url, redirect }) => {
	const client = createClient();
	const previewUrl = url.searchParams.get("previewUrl") || "/";
	const documentId = url.searchParams.get("documentId");

	if (documentId) {
		try {
			const doc = await client.getByID(documentId);
			if (doc.url) {
				return redirect(doc.url);
			}
		} catch {}
	}

	return redirect(previewUrl);
};
