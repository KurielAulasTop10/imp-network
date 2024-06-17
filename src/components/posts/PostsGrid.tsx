// "use client";

import type { PostDocument } from "../../../prismicio-types";
import PostCard from "@/components/posts/PostCard";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

export default function PostsGrid({ allPosts }: { allPosts: PostDocument[] }) {
	// const [q, setQ] = useState<string>("");
	// const searchParams = useSearchParams();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// useEffect(() => {
	// 	const query = searchParams?.get("q");

	// 	if (query !== undefined && query !== null) {
	// 		setQ(query);
	// 	}
	// }, []);
	return (
		<section className="flex scroll-mt-12 flex-col items-center space-y-16">
			{allPosts
			// .filter((post) =>
			// 	post.data?.titulo
			// 		?.toLowerCase()
			// 		.includes(Array.isArray(q) ? q.join("") : (q || "").toLowerCase()),
			// )
			.length ? (
				<ul
					id="posts-grid"
					className={`grid w-full grid-cols-1 ${allPosts.length < 3 ? `md:grid-cols-${allPosts.length}` : "md:grid-cols-2 xl:grid-cols-3"} gap-x-4 gap-y-5`}
				>
					{allPosts
						// .filter((post) =>
						// 	post.data?.titulo
						// 		?.toLowerCase()
						// 		.includes(
						// 			Array.isArray(q) ? q.join("") : (q || "").toLowerCase(),
						// 		),
						// )
						.map(
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
		</section>
	);
}
