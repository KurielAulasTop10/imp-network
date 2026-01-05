"use client";

import { useEffect, useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import PostCard from "@/components/posts/PostCard";
import { createClient } from "@/prismicio";
import type { AuthorDocument, PostDocument } from "../../../prismicio-types";

export default function PostsGrid({
	allPosts,
	currentPage,
	onPageChange,
}: {
	allPosts: PostDocument[];
	currentPage: number;
	onPageChange: (page: number) => void;
}) {
	const [postsPerPage] = useState<number>(21);
	const [authorsData, setAuthorsData] = useState<Map<string, AuthorDocument>>(
		new Map(),
	);

	const totalPages = Math.ceil(allPosts.length / postsPerPage);

	const filteredPosts = allPosts.filter((_, index) => {
		const start = (currentPage - 1) * postsPerPage;
		const end = start + postsPerPage;
		return index >= start && index < end;
	});

	useEffect(() => {
		const fetchAuthors = async () => {
			const client = createClient();
			const authorsMap = new Map<string, AuthorDocument>();

			// Get unique author UIDs from filtered posts
			const authorUIDs = new Set<string>();
			filteredPosts.forEach((post) => {
				interface MyAuthorData {
					uid?: string;
				}
				const authorData = post.data.author as unknown as MyAuthorData;
				if (authorData?.uid) {
					authorUIDs.add(authorData.uid);
				}
			});

			// Fetch all authors at once
			for (const uid of authorUIDs) {
				try {
					const author = await client.getByUID("author", uid);
					authorsMap.set(uid, author as AuthorDocument);
				} catch (error) {
					console.error(`Failed to fetch author ${uid}:`, error);
				}
			}

			setAuthorsData(authorsMap);
		};

		if (filteredPosts.length > 0) {
			fetchAuthors();
		}
	}, [filteredPosts]);

	const getAuthorData = (post: PostDocument): AuthorDocument | null => {
		interface MyAuthorData {
			uid?: string;
		}
		const authorData = post.data.author as unknown as MyAuthorData;
		return authorData?.uid ? authorsData.get(authorData.uid) || null : null;
	};

	return (
		<section className="flex scroll-mt-12 flex-col items-center space-y-6">
			{filteredPosts.length >= 1 ? (
				<div
					className={`grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10`}
				>
					{filteredPosts.map(
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
					<span className="text-gray-400 font-medium">
						{totalPages === 0 ? 1 : totalPages}
					</span>
				</div>

				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === (totalPages === 0 ? 1 : totalPages)}
					className="p-3 bg-linear-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:pointer-events-none transform hover:scale-105 cursor-pointer"
				>
					<RiArrowRightDoubleLine size={24} className="text-white" />
				</button>
			</div>
		</section>
	);
}
