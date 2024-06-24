"use server";

import PostsGrid from "@/components/posts/PostsGrid";
import { createClient } from "@/prismicio";
import Sidebar from "./_components/Sidebar";
import { Suspense } from "react";

export default async function BlogPage() {
	const clientPrismic = createClient();
	const allPosts = await clientPrismic.getAllByType("post", {
		orderings: {
			field: "my.post.data",
			direction: "desc",
		},
	});

	return (
		<div className="flex flex-col xl:flex-row justify-between items-start md:items-center xl:items-start mt-5 md:mt-10 mx-auto px-2 md:px-5 w-full gap-10">
			<div className="w-full">
				<Suspense fallback={<p>Loading...</p>}>
					<PostsGrid allPosts={allPosts} />
				</Suspense>
			</div>
			<Sidebar />
		</div>
	);
}
