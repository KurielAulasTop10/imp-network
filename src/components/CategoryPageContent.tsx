import { useState } from "react";
import PostsGrid from "@/components/posts/PostsGrid";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

const PAGE_SIZE = 21;

interface CategoryPageContentProps {
	allPosts: PostDocument[];
	authorsMap: Map<string, AuthorDocument>;
}

export default function CategoryPageContent({
	allPosts,
	authorsMap,
}: CategoryPageContentProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
	const start = (currentPage - 1) * PAGE_SIZE;
	const posts = allPosts.slice(start, start + PAGE_SIZE);

	return (
		<PostsGrid
			posts={posts}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={setCurrentPage}
			authorsMap={authorsMap}
		/>
	);
}
