"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NewsCarousel from "@/components/NewsCarousel";
import PostsGrid from "@/components/posts/PostsGrid";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

interface HomePageContentProps {
	initialPosts: PostDocument[];
	totalPages: number;
	authorsMap: Map<string, AuthorDocument>;
}

async function fetchPostsPage(
	page: number,
): Promise<{ posts: PostDocument[]; totalPages: number }> {
	const res = await fetch(`/api/posts?page=${page}`);
	if (!res.ok) throw new Error("Failed to fetch posts");
	return res.json();
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 60 * 1000, refetchOnWindowFocus: false },
	},
});

function HomePageContentInner({
	initialPosts,
	totalPages,
	authorsMap,
}: HomePageContentProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data, isLoading } = useQuery({
		queryKey: ["posts", currentPage],
		queryFn: () => fetchPostsPage(currentPage),
		enabled: currentPage > 1,
	});

	const posts = currentPage === 1 ? initialPosts : (data?.posts ?? []);
	const actualTotalPages = data?.totalPages ?? totalPages;

	return (
		<div>
			{currentPage === 1 && <NewsCarousel posts={initialPosts} />}
			<PostsGrid
				posts={posts}
				currentPage={currentPage}
				totalPages={actualTotalPages}
				onPageChange={setCurrentPage}
				authorsMap={authorsMap}
				isLoading={isLoading && currentPage > 1}
			/>
		</div>
	);
}

export default function HomePageContent(props: HomePageContentProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<HomePageContentInner {...props} />
		</QueryClientProvider>
	);
}
