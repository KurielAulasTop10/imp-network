import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { getAllPostsFromNotion } from '@/services/posts';

export default async function BlogPage() {
  const allPosts = await getAllPostsFromNotion();

  return (
    <>
      <SearchBar />
      <PostsGrid allPosts={allPosts} />
    </>
  );
}
