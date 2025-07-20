/** biome-ignore-all lint/performance/noImgElement: false */
import { PrismicRichText } from "@prismicio/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { createClient } from "@/prismicio";
import { cdn } from "@/utils/cdn";
import type { PostDocumentDataReviewItem } from "../../../../../prismicio-types";

export default async function PostPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;

	const { slug } = params;

	const client = createClient({ fetchOptions: { cache: "no-cache" } });

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

	return (
		<article
			data-revalidated-at={Date.now()}
			className="flex flex-col mx-auto text-justify my-5 p-3"
		>
			<div className="mx-auto w-full">
				<div className="flex flex-col items-start gap-3">
					<div className="flex space-x-2 flex-wrap">
						{article.tags.map((category) => (
							<Link
								href={`/categoria/${category}`}
								key={article.data.titulo + category}
								className="text-red-500 hover:text-red-600 text-base capitalize font-normal"
							>
								{category}
							</Link>
						))}
					</div>
					<h1 className="text-base font-bold">{article.data.titulo}</h1>
					<time
						dateTime={`${article.data?.data}`}
						className="text-base font-thin text-white"
					>
						{new Date(`${article.data?.data}`).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "long",
							year: "numeric",
							hour: "numeric",
							minute: "numeric",
							hourCycle: "h23",
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
						})}
					</time>
					<div className="relative aspect-video w-full">
						<img
							src={cdn(article.data.cover.url as string, 0, 0)}
							alt={article.data.cover.alt || ""}
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
			</div>
			<div className="text-base gap-5">
				<PrismicRichText
					field={article.data.editor}
					components={{
						heading1: ({ text }) => (
							<h1 className="my-3 text-base font-semibold">{text}</h1>
						),
						heading2: ({ text }) => (
							<h2 className="my-3 text-base font-semibold">{text}</h2>
						),
						heading3: ({ text }) => (
							<h3 className="my-3 text-base font-semibold">{text}</h3>
						),
						heading4: ({ text }) => (
							<h4 className="my-3 text-base font-semibold">{text}</h4>
						),
						paragraph: ({ children, text }) => {
							const textString = text as unknown as string;
							return textString?.startsWith("!vid") ? (
								// biome-ignore lint/a11y/useMediaCaption: false
								<video
									src={textString.replace("!vid", "")}
									controls
									className="w-full aspect-video"
								/>
							) : textString?.startsWith("!aud") ? (
								// biome-ignore lint/a11y/useMediaCaption: <false>
								<audio
									controls
									autoPlay
									loop
									className="w-full shadow-lg rounded-sm my-3"
									controlsList="noplaybackrate nodownload"
								>
									<source src={textString.replace("!aud", "")} />
								</audio>
							) : textString?.startsWith("!warn") ? (
								<div className="relative w-full flex flex-wrap items-center justify-center py-1 p-3 my-3 rounded-lg text-base border-solid border border-yellow-600 text-yellow-600 group bg-[linear-gradient(#ca8a041a,#ca8a041a)]">
									<p className="flex flex-row items-center mr-auto gap-x-2">
										{textString.replace("!warn ", "")}
									</p>
								</div>
							) : textString?.startsWith("!spoiler") ? (
								<p className="filter blur-sm hover:blur-none transition-all duration-300 my-3 text-base">
									{textString.replace("!spoiler ", "")}
								</p>
							) : (
								<p className="my-3 text-base">{children}</p>
							);
						},
						preformatted: ({ text }) => (
							<blockquote className="p-3 pr-3 mb-3">{text}</blockquote>
						),
						embed: ({ node }) =>
							node.oembed.embed_url.includes("youtube.com") ||
							node.oembed.embed_url.includes("youtu.be") ? (
								<iframe
									src={node.oembed.embed_url
										.replace("watch?v=", "embed/")
										.replace("youtu.be", "youtube.com/embed")}
									width="100%"
									height="100%"
									title={node.oembed.title as string}
									className="aspect-video"
								/>
							) : (
								<div
									// biome-ignore lint/security/noDangerouslySetInnerHtml: false
									dangerouslySetInnerHTML={{
										__html: node.oembed.html as TrustedHTML,
									}}
									className="w-full flex items-center justify-center"
								/>
							),
						image: ({ node }) => {
							return (
								<img
									src={cdn(node.url, 0, 0)}
									alt={node.alt as string}
									width={"100%"}
									height={"100%"}
									className="w-full"
								/>
							);
						},
						hyperlink: ({ node, children }) => (
							<Link
								href={node.data.url as string}
								target={
									node.data.url?.includes("imperionetwork.fr")
										? undefined
										: "_blank"
								}
								className="text-red-500 hover:text-red-600"
							>
								{children}
							</Link>
						),
						list: ({ children }) => (
							<ul className="my-3 text-base list-disc ml-5">{children}</ul>
						),
						oList: ({ children }) => (
							<ol className="my-3 text-base list-decimal ml-5">{children}</ol>
						),
					}}
				/>
				{reviewWithSteamPage?.steam_page?.url && (
					<iframe
						src={reviewWithSteamPage.steam_page.url as string}
						title="Steam page"
						height="190"
						className="w-full aspect-video"
					></iframe>
				)}
			</div>
			{article.data.review[0]?.estado && (
				<>
					{reviewWithSteamPage.rating === "Feliz" && (
						<p className="text-base">Nota: Feliz</p>
					)}
					{reviewWithSteamPage.rating === "Mediano" && (
						<p className="text-base">Nota: Mediano</p>
					)}
					{reviewWithSteamPage.rating === "Desiludido" && (
						<p className="text-base">Nota: Desiludido</p>
					)}
				</>
			)}
			<p className="text-base">Autor: {author.uid}</p>
			<Script src="https://platform.twitter.com/widgets.js" async />
		</article>
	);
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;

	const { slug } = params;

	const client = createClient();
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
				authors: [
					{
						name:
							myAuthorData.uid.charAt(0).toUpperCase() +
							myAuthorData.uid.slice(1),
					},
				],
				description: `Leia "${post.data.titulo}" de ${
					myAuthorData.uid.charAt(0).toUpperCase() + myAuthorData.uid.slice(1)
				} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
				creator:
					myAuthorData.uid.charAt(0).toUpperCase() + myAuthorData.uid.slice(1),
				publisher:
					myAuthorData.uid.charAt(0).toUpperCase() + myAuthorData.uid.slice(1),
				robots: {
					index: false,
				},
				openGraph: {
					type: "article",
					authors: [
						myAuthorData.uid.charAt(0).toUpperCase() +
							myAuthorData.uid.slice(1),
					],
					images: [
						{
							url: cdn(post.data.cover.url as string, 1920, 0),
						},
					],
				},
				twitter: {
					title: post.data.titulo as string,
					description: `Leia "${post.data.titulo}" de ${
						myAuthorData.uid.charAt(0).toUpperCase() + myAuthorData.uid.slice(1)
					} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
					images: [cdn(post.data.cover.url as string, 1920, 0)],
					card: "summary_large_image",
				},
			}
		: {};
}
