import PostsGrid from '@/components/posts/PostsGrid';
import { getAllPostsFromNotion } from '@/services/posts';
import { toUniqueArray } from '@/utils/to-unique-array';

export default async function CategoryPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const allPosts = await getAllPostsFromNotion();

	const filteredPosts = toUniqueArray(
		allPosts
			.filter(post => post.published)
			.filter(post => post.categories.includes(id))
			.map(post => post),
	).sort();

	return (
		<div className="mt-10 px-5 md:px-20">
			<PostsGrid allPosts={filteredPosts} />
		</div>
	);
}
