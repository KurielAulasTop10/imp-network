import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import NotionPage from "@/components/NotionPage";
import RelatedPosts from "@/components/posts/RelatedPosts";
import { getRecordMap } from "@/libs/notion";
import { getAllPostsFromNotion } from "@/services/posts";
import type { Post } from "@/types/post";

export const revalidate = 3600;

export default async function PostPage({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const allPosts = await getAllPostsFromNotion();

	const post = allPosts.find((p) => p.slug === slug);
	if (!post) {
		return notFound();
	}

	if (!post.published) {
		return (
			<article
				data-revalidated-at={new Date().getTime()}
				className="mx-auto mt-40 text-center"
			>
				<h2 className="mb-4 text-3xl font-bold">Publicação não encontrada</h2>
				<Link href="/">
					<span className="mr-2">&larr;</span>
					<span>Voltar á página inicial</span>
				</Link>
			</article>
		);
	}

	const relatedPosts: Post[] = allPosts.filter(
		(p) =>
			p.slug !== slug && p.categories.some((v) => post.categories.includes(v)),
	);

	const recordMap = await getRecordMap(post.id);

	return (
		<article
			data-revalidated-at={new Date().getTime()}
			className="flex flex-col max-w-full md:max-w-[60vw] mx-auto text-justify"
		>
			<NotionPage post={post} recordMap={recordMap} />
			<RelatedPosts posts={relatedPosts} />
		</article>
	);
}

export async function generateStaticParams() {
	const allPosts = await getAllPostsFromNotion();

	return allPosts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params: { slug },
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const allPosts = await getAllPostsFromNotion();
	const post = allPosts.find((p) => p.slug === slug);

	return post
		? {
				title: post.title,
				authors: [{ name: post.author }],
				description: `Leia ${post.title} de ${post.author} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
				creator: post.author,
				publisher: post.author,
				openGraph: {
					type: "article",
					authors: [post.author],
					images: [
						{
							url: post.cover,
						},
					],
				},
				twitter: {
					title: post.title,
					description: `Leia ${post.title} de ${post.author} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
					images: [post.cover],
					card: "summary_large_image",
				},
			}
		: {};
}
