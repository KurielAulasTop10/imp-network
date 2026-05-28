"use client";

import { filter } from "@prismicio/client";
import { useEffect, useState } from "react";
import PostsGrid from "@/components/posts/PostsGrid";
import { createClient } from "@/prismicio";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

const PAGE_SIZE = 21;

export default function SearchContent() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [allPosts, setAllPosts] = useState<PostDocument[]>([]);
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
			const [results, authors] = await Promise.all([
				client.getAllByType("post", {
					orderings: { field: "my.post.data", direction: "desc" },
					filters: [filter.fulltext("my.post.titulo", q ?? "")],
					fetchLinks: ["author.avatar", "author.banner", "author.descricao"],
				}),
				client.getAllByType("author"),
			]);
			setAllPosts(results as PostDocument[]);
			setAuthorsMap(
				new Map(
					authors
						.filter((a): a is typeof a & { uid: string } => a.uid !== null)
						.map((a) => [a.uid, a as unknown as AuthorDocument]),
				),
			);
			setLoading(false);
		};

		if (q) {
			fetchPosts();
		} else {
			setAllPosts([]);
			setLoading(false);
		}
	}, [q]);

	const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
	const start = (currentPage - 1) * PAGE_SIZE;
	const posts = allPosts.slice(start, start + PAGE_SIZE);

	return loading ? (
		<p className="text-center py-[25vh]">
			Carregando... Aguarde alguns segundos.
		</p>
	) : (
		<div className="mt-10 px-5">
			<PostsGrid
				posts={posts}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				authorsMap={authorsMap}
			/>
		</div>
	);
}
