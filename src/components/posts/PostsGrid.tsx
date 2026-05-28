"use client";

import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import PostCard from "@/components/posts/PostCard";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

interface PostsGridProps {
	posts: PostDocument[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	authorsMap: Map<string, AuthorDocument>;
	isLoading?: boolean;
}

export default function PostsGrid({
	posts,
	currentPage,
	totalPages,
	onPageChange,
	authorsMap,
	isLoading,
}: PostsGridProps) {
	const getAuthorData = (post: PostDocument): AuthorDocument | null => {
		const linked = post.data.author as unknown as AuthorDocument | null;
		if (!linked?.uid) return null;
		return authorsMap.get(linked.uid) ?? linked;
	};

	const clampedTotal = totalPages === 0 ? 1 : totalPages;

	return (
		<section className="flex scroll-mt-12 flex-col items-center space-y-6">
			{isLoading ? (
				<div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10">
					{Array.from({ length: 21 }).map((_, i) => (
						<div
							key={i}
							className="p-4 rounded-2xl shadow-sm animate-pulse bg-gray-700 min-h-48 w-full flex flex-col justify-end"
						>
							<div className="h-2.5 rounded-full bg-gray-900 mb-4 w-3/4" />
							<div className="h-2.5 rounded-full bg-gray-900 w-1/2" />
						</div>
					))}
				</div>
			) : posts.length >= 1 ? (
				<div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10">
					{posts.map(
						(post) =>
							post && (
								<PostCard
									post={post}
									key={post.uid}
									authorData={getAuthorData(post)}
								/>
							),
					)}
				</div>
			) : (
				<p className="text-center text-lg text-white">Sem resultados</p>
			)}
			<div className="flex items-center gap-4 p-4 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 w-fit mx-auto">
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="p-3 bg-linear-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:pointer-events-none transform hover:scale-105 cursor-pointer"
				>
					<RiArrowLeftDoubleLine size={24} className="text-white" />
				</button>
				<div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-600">
					<span className="text-white font-semibold text-lg min-w-[40px] text-center">
						{currentPage}
					</span>
					<span className="text-gray-400">de</span>
					<span className="text-gray-400 font-medium">{clampedTotal}</span>
				</div>
				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === clampedTotal}
					className="p-3 bg-linear-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:pointer-events-none transform hover:scale-105 cursor-pointer"
				>
					<RiArrowRightDoubleLine size={24} className="text-white" />
				</button>
			</div>
		</section>
	);
}
