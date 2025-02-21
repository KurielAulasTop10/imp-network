"use client";

import type { PostDocument } from "../../../prismicio-types";
import PostCard from "@/components/posts/PostCard";
import { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

export default function PostsGrid({ allPosts }: { allPosts: PostDocument[] }) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [postsPerPage] = useState<number>(21);

	const totalPages = Math.ceil(allPosts.length / postsPerPage);

	const filteredPosts = allPosts.filter((_, index) => {
		const start = (currentPage - 1) * postsPerPage;
		const end = start + postsPerPage;
		return index >= start && index < end;
	});

	return (
		<section className="flex scroll-mt-12 flex-col items-center space-y-6">
			{filteredPosts.length >= 1 ? (
				<ul
					id="posts-grid"
					className={`grid w-full grid-cols-1 ${allPosts.length < 3 ? `md:grid-cols-${allPosts.length}` : "md:grid-cols-2 xl:grid-cols-3"} gap-x-4 gap-y-5`}
				>
					{filteredPosts.map(
						(post) =>
							post && (
								<li key={post.uid}>
									<PostCard post={post} />
								</li>
							),
					)}
				</ul>
			) : (
				<p className="text-center text-lg">Sem resultados</p>
			)}
			<div className="gap-3 flex items-center">
				<button
					type="button"
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
					className="bg-red-600 rounded-md hover:bg-red-500 cursor-pointer disabled:hidden"
				>
					<RiArrowLeftDoubleLine size={32} />
				</button>
				<span className="text-lg">{currentPage}</span>
				<button
					type="button"
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === (totalPages === 0 ? 1 : totalPages)}
					className="bg-red-600 rounded-md hover:bg-red-500 cursor-pointer disabled:hidden"
				>
					<RiArrowRightDoubleLine size={32} />
				</button>
			</div>
		</section>
	);
}
