import type { PostDocument } from "../../../prismicio-types";
import PostCard from "@/components/posts/PostCard";

export default function PostsGrid({ allPosts }: { allPosts: PostDocument[] }) {
	return (
		<section className="flex scroll-mt-12 flex-col items-center space-y-16">
			{allPosts.length ? (
				<ul
					id="posts-grid"
					className={`grid w-full grid-cols-1 ${allPosts.length < 3 ? `md:grid-cols-${allPosts.length}` : "md:grid-cols-2 xl:grid-cols-3"} gap-x-4 gap-y-5`}
				>
					{allPosts.map(
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
