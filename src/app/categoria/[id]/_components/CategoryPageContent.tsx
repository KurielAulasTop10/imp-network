"use client";

import { useState } from "react";
import PostsGrid from "@/components/posts/PostsGrid";
import type { PostDocument } from "../../../../../prismicio-types";

interface CategoryPageContentProps {
	allPosts: PostDocument[];
}

export default function CategoryPageContent({
	allPosts,
}: CategoryPageContentProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);

	return (
		<PostsGrid
			allPosts={allPosts}
			currentPage={currentPage}
			onPageChange={setCurrentPage}
		/>
	);
}
