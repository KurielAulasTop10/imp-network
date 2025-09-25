import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import type { PostDocument } from "../../../../prismicio-types";
import CategoryPageContent from "./_components/CategoryPageContent";

export default async function CategoryPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;

	const { id } = params;

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
		<div className="mt-10 px-5">
			<CategoryPageContent allPosts={allPosts as PostDocument[]} />
		</div>
	);
}

export async function generateMetadata(props: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const params = await props.params;

	let { id } = params;

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
