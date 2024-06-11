"use client";

import { useRef } from "react";

import Paginate from "@/components/Paginate";
import PostCard from "@/components/posts/PostCard";
import usePosts from "@/hooks/use-posts";
import type { Post } from "@/types/post";

export default function PostsGrid({ allPosts }: { allPosts: Post[] }) {
	const { posts, totalPages } = usePosts(allPosts);
	const rootRef = useRef<HTMLDivElement>(null);

	return (
		<section
			ref={rootRef}
			className="flex scroll-mt-12 flex-col items-center space-y-16"
		>
			{posts.length ? (
				<ul
					id="posts-grid"
					className={`grid w-full grid-cols-1 ${posts.length < 3 ? `md:grid-cols-${posts.length}` : "md:grid-cols-2 xl:grid-cols-3"} gap-x-4 gap-y-5`}
				>
					{posts.map((post) => (
						<li key={post.slug}>
							<PostCard post={post} />
						</li>
					))}
				</ul>
			) : (
				<p className="text-center text-lg">Sem resultados</p>
			)}
			<Paginate totalPages={totalPages} elementToScroll={rootRef.current} />
		</section>
	);
}
