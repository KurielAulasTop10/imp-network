"use client";

import { createClient } from "@/prismicio";
import PostsGrid from "@/components/posts/PostsGrid";
import type { PostDocument } from "../../../prismicio-types";
import { filter } from "@prismicio/client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

async function SearchResults() {
	const searchParams = useSearchParams();
	const q = searchParams.get("q");

	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
	});

	const allPosts = await client.getAllByType("post", {
		orderings: {
			field: "my.post.data",
			direction: "desc",
		},
		filters: [filter.fulltext("my.post.titulo", q as string)],
	});

	return (
		<div className="mt-10 px-5">
			<PostsGrid allPosts={allPosts as PostDocument[]} />
		</div>
	);
}

export default function SearchPage() {
	return (
		<Suspense
			fallback={
				<p className="text-center py-[25vh]">
					Carregando... Aguarde alguns segundos.
				</p>
			}
		>
			<SearchResults />
		</Suspense>
	);
}
