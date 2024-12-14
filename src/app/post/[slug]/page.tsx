import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import CategoryList from "@/components/CategoryList";
import AuthorBox from "@/components/posts/AuthorBox";
import { type JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import type { PostDocumentDataReviewItem } from "../../../../prismicio-types";
import Comments from "./_components/Comments";
import Ad from "./_components/Ad";
import {
	RiBookReadFill,
	RiDoubleQuotesR,
	RiEmotionHappyFill,
	RiEmotionNormalFill,
	RiEmotionUnhappyFill,
	RiExternalLinkLine,
} from "react-icons/ri";
import Link from "next/link";
import Script from "next/script";
import { cdn } from "@/utils/cdn";

export default async function PostPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;

	const { slug } = params;

	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
		fetchOptions: {
			cache: "no-store",
		},
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

	const ads = await client.getAllByType("anuncio").catch(() => notFound());

	const adsSorted = ads.sort(
		() => Math.random() - 0.5,
	) as AnuncioDocumentData[];

	const reviewWithSteamPage = article.data
		.review[0] as PostDocumentDataReviewItem & {
		steam_page?: SteamPage;
	};

	interface AnuncioDocumentData {
		data: {
			link: {
				url: string;
			};
			imagem: {
				url: string;
			};
		};
	}

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
		paragraph: ({ children }) => (
			<div>
				{Math.floor(Math.random() * 15) + 1 === 5 &&
					adsSorted[0]?.data.link && (
						<Ad
							ad={adsSorted}
							index={Math.floor(Math.random() * adsSorted.length)}
						/>
					)}
				<p className="my-3 text-lg">{children}</p>
			</div>
		),
		preformatted: ({ children }) => (
			<div className="relative bg-black px-3 py-1 rounded-md my-3 text-lg overflow-hidden">
				<RiDoubleQuotesR className="absolute top-0 left-1 w-14 h-auto text-zinc-800" />
				<p className="relative z-10">{children}</p>
			</div>
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
					className="rounded-md aspect-video"
				/>
			) : (
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: node.oembed.html as TrustedHTML,
					}}
					className="w-full flex items-center justify-center"
				/>
			),
		image: ({ node }) => {
			return (
				<img
					src={cdn(node.url, 1920, 0)}
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
				target={
					node.data.url?.includes("imperionetwork.me") ? undefined : "_blank"
				}
				className={
					article.tags.includes("Grátis")
						? "bg-red-500 hover:bg-red-600 text-white p-3 rounded-md flex w-max gap-2 items-center mx-auto"
						: "text-red-500 hover:text-red-600"
				}
			>
				{article.tags.includes("Grátis") ? <RiExternalLinkLine /> : <></>}{" "}
				{children}
			</Link>
		),
		list: ({ children }) => (
			<ul className="my-3 text-lg list-disc ml-5">{children}</ul>
		),
		oList: ({ children }) => (
			<ol className="my-3 text-lg list-decimal ml-5">{children}</ol>
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
					<h1 className="flex gap-2 items-center text-2xl font-bold">
						{article.data.titulo}{" "}
						<Link href={`/post/${article.uid}/classic`}>
							<RiBookReadFill />
						</Link>
					</h1>
					<time
						dateTime={`${article.data?.data}`}
						className="text-base font-thin text-gray-400"
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
					<div className="relative aspect-video w-full rounded-md">
						<img
							src={cdn(article.data.cover.url as string, 1920, 0)}
							alt={article.data.cover.alt || ""}
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
				{reviewWithSteamPage?.steam_page?.url && (
					// biome-ignore lint/style/useSelfClosingElements: <explanation>
					<iframe
						src={reviewWithSteamPage.steam_page.url as string}
						title="Steam page"
						height="190"
						className="w-full aspect-video rounded-md"
					></iframe>
				)}
			</div>
			<div className="w-full flex flex-col gap-5 mt-3">
				{article.data.review[0]?.estado && (
					<div
						style={{
							background: `url(${cdn(article.data.cover.url as string, 1120, 200)})`,
						}}
						className="rounded-md bg-center bg-cover"
					>
						<div className="flex max-md:flex-col gap-3 items-center h-full w-full bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-2">
							<img
								src={cdn(article.data.cover.url as string, 400, 0)}
								className="rounded-md aspect-video w-full md:w-40"
								alt={article.data.cover.alt || ""}
							/>
							<div className="flex flex-col max-md:items-center">
								<h1 className="flex text-white text-lg font-light items-center gap-2 capitalize">
									{article.data.titulo?.replace("Review - ", "")}
								</h1>
								<p className="text-sm text-gray-200 flex font-thin">
									<PrismicRichText field={article.data.review[0]?.descricao} />
								</p>
								<p className="text-xs text-gray-300 font-thin">
									Descobre como funciona o nosso sistema de notas, lendo a nossa{" "}
									<Link
										href={"/review-policy"}
										className="text-red-600 font-normal"
									>
										política de análises
									</Link>
									.
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
				<Script src="https://platform.twitter.com/widgets.js" async />
			</div>
		</article>
	);
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;

	const { slug } = params;

	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
		fetchOptions: {
			cache: "no-store",
		},
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
