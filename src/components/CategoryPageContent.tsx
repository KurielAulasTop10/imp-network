import { useState } from "react";
import PostsGrid from "@/components/posts/PostsGrid";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

interface CategoryPageContentProps {
	allPosts: PostDocument[];
	authorsMap: Map<string, AuthorDocument>;
}

export default function CategoryPageContent({
	allPosts,
	authorsMap,
}: CategoryPageContentProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);

	return (
		<PostsGrid
			allPosts={allPosts}
			currentPage={currentPage}
			onPageChange={setCurrentPage}
			authorsMap={authorsMap}
		/>
	);
}
