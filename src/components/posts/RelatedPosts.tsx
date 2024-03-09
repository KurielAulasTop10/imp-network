'use client';

import PostCard from '@/components/posts/PostCard';
import { Post } from '@/types/post';

export default function RelatedPosts({ posts }: { posts: Post[] }) {
	if (posts.length === 0) {
		return null;
	}

	return (
		<section className="flex flex-col -mt-20 px-3 md:max-w-[60vw]">
			<h1 className="flex items-center gap-3 text-3xl font-bold drop-shadow-xl drop-shadow-gray-400">
				<div className="w-1 h-6 bg-red-600" /> Recomendados
			</h1>
			<ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
				{posts.slice(0, 3).map(post => (
					<li key={post.slug}>
						<div
							key={post.slug}
							className="transition-all duration-300 hover:scale-[1]"
						>
							<PostCard post={post} />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
