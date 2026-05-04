"use client";

import { useState } from "react";
import NewsCarousel from "@/components/NewsCarousel";
import PostsGrid from "@/components/posts/PostsGrid";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

interface HomePageContentProps {
	allPosts: PostDocument[];
	authorsMap: Map<string, AuthorDocument>;
}

export default function HomePageContent({
	allPosts,
	authorsMap,
}: HomePageContentProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);

	return (
		<div>
			{currentPage === 1 && <NewsCarousel posts={allPosts} />}
			<PostsGrid
				allPosts={allPosts.slice(1)}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				authorsMap={authorsMap}
			/>
		</div>
	);
}
