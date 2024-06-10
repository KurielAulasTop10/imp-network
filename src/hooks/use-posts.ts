import { useMemo } from "react";

import { useRecoilValue } from "recoil";

import { pageState } from "@/states/page";
import { queryState } from "@/states/query";
import type { Post } from "@/types/post";
import { search } from "@/utils/search";

const POST_PER_PAGE = 12;

export default function usePosts(allPosts: Post[]) {
	const page = useRecoilValue(pageState);
	const query = useRecoilValue(queryState);

	const allPostsFiltered = useMemo(
		() =>
			allPosts.filter((post) => {
				if (!post.published) {
					return false;
				}

				if (query && !search(post.title, query)) {
					return false;
				}

				return true;
			}),
		[allPosts, query],
	);
	allPostsFiltered.sort((postA, postB) => (postA.lastEditedAt > postB.lastEditedAt ? -1 : 1));
	allPostsFiltered.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

	const totalPages = Math.ceil(allPostsFiltered.length / POST_PER_PAGE);
	const offset = (page ? +page - 1 : 0) * POST_PER_PAGE;
	const postsForCurrentPage = allPostsFiltered.slice(
		offset,
		offset + POST_PER_PAGE,
	);

	return {
		posts: postsForCurrentPage,
		totalPages,
	};
}
