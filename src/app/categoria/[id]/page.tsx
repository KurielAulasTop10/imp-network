import { createClient } from "@/prismicio";
import type { PostDocument } from "../../../../prismicio-types";
import PostsGrid from "@/components/posts/PostsGrid";

export default async function CategoryPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const client = createClient();

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const allPosts = await client.getAllByTag(
		capitalizeFirstLetter(decodeURI(id))
			.replace("Pc", "PC")
			.replace("Playstation", "PlayStation"),
		{
			orderings: {
				field: "my.post.data",
				direction: "desc",
			},
		},
	);

	return (
		<div className="mt-10 px-5 md:px-5">
			<PostsGrid allPosts={allPosts as PostDocument[]} />
		</div>
	);
}
