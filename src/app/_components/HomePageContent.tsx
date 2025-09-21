"use client";

import { useState } from "react";
import NewsCarousel from "@/components/NewsCarousel";
import PostsGrid from "@/components/posts/PostsGrid";
import type { PostDocument } from "../../../prismicio-types";

interface HomePageContentProps {
	allPosts: PostDocument[];
}

export default function HomePageContent({ allPosts }: HomePageContentProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);

	return (
		<div>
			{currentPage === 1 && <NewsCarousel posts={allPosts} />}

			<PostsGrid
				allPosts={allPosts.slice(4)}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
