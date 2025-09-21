"use client";

import { filter } from "@prismicio/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostsGrid from "@/components/posts/PostsGrid";
import { createClient } from "@/prismicio";
import type { PostDocument } from "../../../../prismicio-types";

export default function Search() {
	const searchParams = useSearchParams();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const q = searchParams.get("q");

	const [posts, setPosts] = useState<PostDocument[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			const client = createClient();
			const allPosts = await client.getAllByType("post", {
				orderings: {
					field: "my.post.data",
					direction: "desc",
				},
				filters: [filter.fulltext("my.post.titulo", q ?? "")],
			});
			setPosts(allPosts as PostDocument[]);
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
			/>
		</div>
	);
}
