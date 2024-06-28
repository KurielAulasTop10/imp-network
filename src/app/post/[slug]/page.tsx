import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import CategoryList from "@/components/CategoryList";
import Image from "next/image";
import AuthorBox from "@/components/posts/AuthorBox";
import { type JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import type { PostDocumentDataReviewItem } from "../../../../prismicio-types";
import Comments from "./_components/Comments";
import {
	RiEmotionHappyFill,
	RiEmotionNormalFill,
	RiEmotionUnhappyFill,
} from "react-icons/ri";
import Link from "next/link";

export default async function PostPage({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
	});

	const article = await client.getByUID("post", slug).catch(() => notFound());
	interface MyAuthorData {
		uid?: string;
	}

	const myAuthorData = article.data.author as unknown as MyAuthorData;

	if (!myAuthorData.uid) {
		return console.error("Author UID not found");
	}
	const author = await client
		.getByUID("author", myAuthorData.uid)
		.catch(() => notFound());

	interface SteamPage {
		url: string;
	}

	const reviewWithSteamPage = article.data
		.review[0] as PostDocumentDataReviewItem & {
		steam_page?: SteamPage;
	};

	const richTextComponents: JSXMapSerializer = {
		heading1: ({ children }) => (
			<h1 className="my-3 text-2xl font-semibold">{children}</h1>
		),
		heading2: ({ children }) => (
			<h2 className="my-3 text-xl font-semibold">{children}</h2>
		),
		heading3: ({ children }) => (
			<h3 className="my-3 text-lg font-semibold">{children}</h3>
		),
		heading4: ({ children }) => (
			<h4 className="my-3 text-lg font-semibold">{children}</h4>
		),
		paragraph: ({ children }) => <p className="my-3 text-lg">{children}</p>,
		preformatted: ({ children }) => (
			<p className="my-3 text-lg bg-black px-2 py-1 rounded-md">{children}</p>
		),
		embed: ({ node }) => (
			<iframe
				src={node.oembed.embed_url
					.replace("watch?v=", "embed/")
					.replace("youtu.be", "youtube.com/embed")}
				width="100%"
				height="100%"
				title={node.oembed.title as string}
				className="rounded-md aspect-video"
			/>
		),
		image: ({ node }) => {
			return (
				<img
					src={node.url}
					alt={node.alt as string}
					width={"100%"}
					height={"100%"}
					className="w-full rounded-md"
				/>
			);
		},
		hyperlink: ({ node, children }) => (
			<Link
				href={node.data.url as string}
				target="_blank"
				className="text-red-500 hover:text-red-600"
			>
				{children}
			</Link>
		),
		list: ({ children }) => (
			<ul className="my-3 text-lg list-disc ml-5">{children}</ul>
		),
		oList: ({ children }) => (
			<ol className="my-3 text-lg list-decimal">{children}</ol>
		),
	};

	return (
		<article
			data-revalidated-at={new Date().getTime()}
			className="flex flex-col max-w-full max-md:p-3 md:max-w-[60vw] mx-auto text-justify my-5"
		>
			<div className="mx-auto w-full">
				<div className="flex flex-col items-start gap-3">
					<CategoryList categories={article.tags} />
					<h1 className="text-2xl font-bold">{article.data.titulo}</h1>
					<p className="text-base font-thin text-gray-400">
						{new Date(`${article.data?.data}`).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "long",
							year: "numeric",
							hour: "numeric",
							minute: "numeric",
							hourCycle: "h24",
						})}
					</p>
					<div className="relative aspect-video w-full rounded-md">
						<Image
							src={article.data.cover.url || ""}
							alt={article.data.cover.alt || ""}
							fill
							quality={70}
							className="object-cover w-full h-full rounded-md"
						/>
					</div>
				</div>
			</div>
			<div className="max-w-full md:max-w-[60vw] text-lg gap-5">
				<PrismicRichText
					field={article.data.editor}
					components={richTextComponents}
				/>
				{reviewWithSteamPage.steam_page.url && (
					// biome-ignore lint/style/useSelfClosingElements: <explanation>
					<iframe
						src={reviewWithSteamPage.steam_page.url as string}
						title="Steam page"
						height="190"
						className="w-full aspect-video rounded-md"
						allowTransparency
					></iframe>
				)}
			</div>
			<div className="w-full flex flex-col gap-5 mt-3">
				{article.data.review[0]?.estado && (
					<div
						style={{
							background: `url(${article.data.cover.url})`,
						}}
						className="rounded-md bg-center bg-cover"
					>
						<div className="flex max-md:flex-col gap-3 items-center h-full w-full bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-2">
							<Image
								src={article.data.cover.url || ""}
								className="rounded-md aspect-video max-md:w-full"
								width={100}
								height={0}
								quality={70}
								alt={article.data.cover.alt || ""}
							/>
							<div className="flex flex-col max-md:items-center">
								<h1 className="flex text-white text-lg font-light items-center gap-2 capitalize">
									{article.data.titulo?.replace("Review - ", "")}
								</h1>
								<p className="text-sm text-gray-200 flex font-thin">
									<PrismicRichText field={article.data.review[0]?.descricao} />
								</p>
							</div>
							<div className="flex items-center mx-auto">
								{reviewWithSteamPage.rating === "Feliz" && (
									<RiEmotionHappyFill className="w-16 h-16 text-green-400" />
								)}
								{reviewWithSteamPage.rating === "Mediano" && (
									<RiEmotionNormalFill className="w-16 h-16 text-orange-300" />
								)}
								{reviewWithSteamPage.rating === "Desiludido" && (
									<RiEmotionUnhappyFill className="w-16 h-16 text-red-500" />
								)}
							</div>
						</div>
					</div>
				)}
				<AuthorBox
					uid={author.uid}
					data={author.data}
					id={author.id}
					url={author.url}
					type={author.type}
					href={author.href}
					tags={author.tags}
					first_publication_date={author.first_publication_date}
					last_publication_date={author.last_publication_date}
					slugs={author.slugs}
					linked_documents={author.linked_documents}
					lang={author.lang}
					alternate_languages={author.alternate_languages}
				/>
				<Comments uid={article.uid} />
			</div>
		</article>
	);
}

export async function generateMetadata({
	params: { slug },
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
	});
	const post = await client.getByUID("post", slug);
	interface MyAuthorData {
		uid?: string;
	}

	const myAuthorData = post.data.author as unknown as MyAuthorData;

	if (!myAuthorData.uid) {
		return {};
	}
	return post
		? {
				title: post.data.titulo,
				authors: [{ name: myAuthorData.uid }],
				description: `Leia "${post.data.titulo}" de ${myAuthorData.uid} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
				creator: myAuthorData.uid,
				publisher: myAuthorData.uid,
				openGraph: {
					type: "article",
					authors: [myAuthorData.uid],
					images: [
						{
							url: post.data.cover.url as string,
						},
					],
				},
				twitter: {
					title: post.data.titulo as string,
					description: `Leia "${post.data.titulo}" de ${myAuthorData.uid} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
					images: [post.data.cover.url as string],
					card: "summary_large_image",
				},
			}
		: {};
}
