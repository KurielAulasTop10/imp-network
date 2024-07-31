import { createClient } from "@/prismicio";
import type { PostDocument } from "../../../../prismicio-types";
import PostsGrid from "@/components/posts/PostsGrid";
import type { Metadata } from "next";

export default async function CategoryPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
		fetchOptions: {
			cache: "no-store",
		},
	});

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
		<div className="mt-10 px-5">
			<PostsGrid allPosts={allPosts as PostDocument[]} />
		</div>
	);
}

export async function generateMetadata({
	params: { id },
}: {
	params: { id: string };
}): Promise<Metadata> {
	id = decodeURIComponent(id);
	return {
		title: `Categoria de ${id} - Império Network`,
		description: `Artigos filtrados pela categoria ${id}, acompanhe as novidades da Império em questão a ${id} com uma lista completa de artigos.`,
		twitter: {
			title: `Categoria de ${id} - Império Network`,
			description: `Artigos filtrados pela categoria ${id}, acompanhe as novidades da Império em questão a ${id} com uma lista completa de artigos.`,
		},
	};
}
