"use client";

import { filter } from "@prismicio/client";
import { useEffect, useState } from "react";
import PostsGrid from "@/components/posts/PostsGrid";
import { createClient } from "@/prismicio";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

export default function SearchContent() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [posts, setPosts] = useState<PostDocument[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [authorsMap, setAuthorsMap] = useState<Map<string, AuthorDocument>>(
		new Map(),
	);

	const searchParams = new URLSearchParams(
		typeof window !== "undefined" ? window.location.search : "",
	);
	const q = searchParams.get("q");

	useEffect(() => {
		const fetchPosts = async () => {
			const client = createClient();
			const [allPosts, allAuthors] = await Promise.all([
				client.getAllByType("post", {
					orderings: {
						field: "my.post.data",
						direction: "desc",
					},
					filters: [filter.fulltext("my.post.titulo", q ?? "")],
					fetchLinks: ["author.avatar", "author.banner", "author.descricao"],
				}),
				client.getAllByType("author"),
			]);
			setPosts(allPosts as PostDocument[]);
			setAuthorsMap(new Map(allAuthors.map((a) => [a.uid, a])));
			setLoading(false);
		};

		if (q) {
			fetchPosts();
		} else {
			setPosts([]);
			setLoading(false);
		}
	}, [q]);

	return loading ? (
		<p className="text-center py-[25vh]">
			Carregando... Aguarde alguns segundos.
		</p>
	) : (
		<div className="mt-10 px-5">
			<PostsGrid
				allPosts={posts ?? []}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				authorsMap={authorsMap}
			/>
		</div>
	);
}
