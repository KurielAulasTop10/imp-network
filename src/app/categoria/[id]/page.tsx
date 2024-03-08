import PostsGrid from '@/components/posts/posts-grid';
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
          .filter((post) => post.published)
          .filter((post) => post.categories.includes(id))
      .map((post) => post)
  ).sort();

  return (
      <PostsGrid allPosts={filteredPosts} />
  );
}
