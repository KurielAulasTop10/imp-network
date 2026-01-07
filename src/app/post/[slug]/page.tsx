/** biome-ignore-all lint/performance/noImgElement: false */

import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import axios from "axios";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { ReactNode } from "react";
import {
	RiAiGenerate2,
	RiAlertLine,
	RiDoubleQuotesR,
	RiEmotionHappyFill,
	RiEmotionNormalFill,
	RiEmotionUnhappyFill,
	RiExternalLinkLine,
} from "react-icons/ri";
import CategoryList from "@/components/CategoryList";
import AuthorBox from "@/components/posts/AuthorBox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { cdn } from "@/utils/cdn";
import { calculateReadingTime } from "@/utils/reading-time";
import type { PostDocumentDataReviewItem } from "../../../../prismicio-types";
import Ad from "./_components/Ad";

const domine = Roboto_Slab({
	subsets: ["latin"],
	weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
});

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const client = createClient({ fetchOptions: { cache: "no-cache" } });

	const article = await client.getByUID("post", slug).catch(() => notFound());
	interface MyAuthorData {
		uid?: string;
	}

	const myAuthorData = article.data.author as unknown as MyAuthorData;

	if (!myAuthorData.uid) {
		return notFound();
	}

	if (article.data.seo_description?.length === 0) {
		axios.post("https://imperionetwork.fr/api/generate-ai", {
			slug,
			title: article.data.titulo,
			article: asText(article.data.editor),
			SEOOnly: !!article.tags.includes("Grátis"),
		});
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

	const readingTime = calculateReadingTime(article.data.editor);

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

	return (
		<article
			data-revalidated-at={Date.now()}
			className={cn(
				domine.className,
				"flex flex-col w-full max-w-full md:w-[75vw] mx-auto my-8 px-4 lg:px-0",
			)}
		>
			<div>
				<div className="flex flex-col items-center gap-6 mb-8">
					<CategoryList categories={article.tags} />
					<h1 className="text-3xl lg:text-5xl font-bold text-center leading-tight text-white">
						{article.data.titulo}
					</h1>
					<div className="flex items-center gap-3 text-sm text-gray-400">
						<time
							dateTime={`${article.data?.data}`}
							className="flex items-center gap-1"
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
						<div className="w-1 h-1 bg-gray-600 rounded-full" />
						<span>{readingTime} min de leitura</span>
					</div>
					<div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
						<img
							src={cdn(article.data.cover.url as string, 1920, 0)}
							alt={article.data.cover.alt || ""}
							className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
			<div className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed prose-p:text-justify prose-a:text-red-500 hover:prose-a:text-red-400 prose-a:no-underline prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-xl prose-video:rounded-xl prose-invert">
				{asText(article.data.resume).length >= 1 && (
					<div className="bg-linear-to-r from-gray-900 to-gray-800 border-l-4 border-red-500 rounded-r-xl p-6 mb-8 shadow-lg">
						<div className="flex items-center gap-3 mb-4">
							<div className="bg-red-500 p-2 rounded-lg">
								<RiAiGenerate2 className="text-white text-2xl" />
							</div>
							<h3 className="text-xl font-semibold text-white">
								Resumo por IA
							</h3>
						</div>
						<div className="text-gray-300 leading-relaxed">
							<PrismicRichText
								field={article.data.resume}
								components={{
									paragraph: ({ text }: { text: unknown }) => (
										<p className="mb-4">
											{(text as unknown as string)
												.replace("```", "")
												.replace("html", "")}
										</p>
									),
									hyperlink: ({
										node,
										children,
									}: {
										node: any;
										children: ReactNode;
									}) => (
										<Link
											href={node.data.url as string}
											target={
												node.data.url?.includes("imperionetwork.fr")
													? undefined
													: "_blank"
											}
											className="text-red-500 hover:text-red-400 font-medium transition-colors"
										>
											{children}
										</Link>
									),
									list: ({ children }: { children: ReactNode }) => (
										<ul className="list-disc ml-6 space-y-2">{children}</ul>
									),
									oList: ({ text }: { text: unknown }) => (
										<ol className="list-decimal ml-6 space-y-2">
											{(text as unknown as string).replace("```", "")}
										</ol>
									),
								}}
							/>
						</div>
					</div>
				)}
				<PrismicRichText
					field={article.data.editor}
					components={{
						heading1: ({ text }: { text: ReactNode }) => (
							<h1 className="text-4xl font-bold mt-8 mb-4 text-white border-b-2 border-red-500 pb-2">
								{text}
							</h1>
						),
						heading2: ({ text }: { text: ReactNode }) => (
							<h2 className="text-3xl font-bold mt-6 mb-3 text-white">
								{text}
							</h2>
						),
						heading3: ({ text }: { text: ReactNode }) => (
							<h3 className="text-2xl font-bold mt-5 mb-3 text-white">
								{text}
							</h3>
						),
						heading4: ({ text }: { text: ReactNode }) => (
							<h4 className="text-xl font-bold mt-4 mb-2 text-white">{text}</h4>
						),
						paragraph: ({
							children,
							text,
						}: {
							children: ReactNode;
							text: string;
						}) => {
							const textString = text;

							return textString?.startsWith("!vid") ? (
								// biome-ignore lint/a11y/useMediaCaption: false
								<video
									src={textString.replace("!vid", "")}
									controls
									className="rounded-xl w-full aspect-video shadow-lg my-6"
								/>
							) : textString?.startsWith("!gif") ? (
								<Dialog>
									<DialogTrigger asChild>
										<div className="my-6 rounded-xl overflow-hidden shadow-lg">
											<img
												src={textString.replace("!gif", "")}
												alt="GIF"
												className="w-full h-auto transition-transform duration-500 hover:scale-105 cursor-pointer"
												loading="lazy"
											/>
										</div>
									</DialogTrigger>
									<DialogContent className="border-0 bg-transparent p-0 shadow-none sm:max-w-full max-h-[90vh]">
										<div className="h-[calc(100vh-150px)] w-full overflow-clip rounded-md bg-transparent shadow-none">
											<img
												src={textString.replace("!gif", "")}
												alt="GIF"
												className="h-full w-full object-contain"
											/>
										</div>
									</DialogContent>
								</Dialog>
							) : textString?.startsWith("!aud") ? (
								// biome-ignore lint/a11y/useMediaCaption: <false>
								<audio
									controls
									autoPlay
									loop
									className="w-full shadow-lg rounded-lg my-4"
									controlsList="noplaybackrate nodownload"
								>
									<source src={textString.replace("!aud", "")} />
								</audio>
							) : textString?.startsWith("!warn") ? (
								<div className="flex items-start gap-3 p-4 my-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
									<RiAlertLine className="text-yellow-400 text-xl mt-0.5 shrink-0" />
									<p className="text-yellow-200">
										{textString.replace("!warn ", "")}
									</p>
								</div>
							) : textString?.startsWith("!spoiler") ? (
								<span className="bg-gray-700 text-gray-700 hover:text-white px-2 py-1 rounded-md transition-all duration-300 cursor-pointer">
									{textString.replace("!spoiler ", "")}
								</span>
							) : (
								<div className="my-4">
									{Math.floor(Math.random() * 15) + 1 === 5 &&
										adsSorted[0]?.data.link && (
											<Ad
												ad={adsSorted}
												index={Math.floor(Math.random() * adsSorted.length)}
											/>
										)}
									<p className="leading-relaxed text-justify">{children}</p>
								</div>
							);
						},
						preformatted: ({ text }: { text: ReactNode }) => (
							<div className="relative bg-linear-to-br from-gray-900 to-black p-6 rounded-xl my-6 overflow-hidden">
								<RiDoubleQuotesR className="absolute top-2 left-2 w-12 h-12 text-gray-800 opacity-50" />
								<blockquote className="relative z-10 text-white font-mono text-sm leading-relaxed">
									{text}
								</blockquote>
							</div>
						),
						embed: ({ node }: { node: any }) =>
							node.oembed.embed_url.includes("youtube.com") ||
							node.oembed.embed_url.includes("youtu.be") ? (
								<div className="my-6 rounded-xl overflow-hidden shadow-xl">
									<iframe
										src={node.oembed.embed_url
											.replace("watch?v=", "embed/")
											.replace("youtu.be", "youtube.com/embed")}
										width="100%"
										height="100%"
										title={node.oembed.title as string}
										className="aspect-video"
										loading="lazy"
									/>
								</div>
							) : (
								<div
									// biome-ignore lint/security/noDangerouslySetInnerHtml: false positive
									dangerouslySetInnerHTML={{
										__html: node.oembed.html as TrustedHTML,
									}}
									className="w-full flex items-center justify-center my-6"
								/>
							),
						image: ({ node }: { node: any }) => {
							return (
								<Dialog>
									<DialogTrigger asChild>
										<div className="my-6 rounded-xl overflow-hidden shadow-lg">
											<img
												src={cdn(node.url, 1920, 0)}
												alt={node.alt as string}
												className="w-full h-auto transition-transform duration-500 hover:scale-105 cursor-pointer"
												loading="lazy"
											/>
										</div>
									</DialogTrigger>
									<DialogContent className="border-0 bg-transparent p-0 shadow-none sm:max-w-full max-h-[90vh]">
										<div className="h-[calc(100vh-150px)] w-full overflow-clip rounded-md bg-transparent shadow-none">
											<img
												src={cdn(node.url, 1920, 0)}
												alt={node.alt as string}
												className="h-full w-full object-contain"
											/>
										</div>
									</DialogContent>
								</Dialog>
							);
						},
						hyperlink: ({
							node,
							children,
						}: {
							children: ReactNode;
							node: any;
						}) => (
							<Link
								href={node.data.url as string}
								target={
									node.data.url?.includes("imperionetwork.fr")
										? undefined
										: "_blank"
								}
								className={
									article.tags.includes("Grátis")
										? "inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
										: "text-red-500 hover:text-red-400 font-medium border-b-2 border-red-600 hover:border-red-400 transition-all duration-200"
								}
							>
								{article.tags.includes("Grátis") && <RiExternalLinkLine />}
								{children}
							</Link>
						),
						list: ({ children }: { children: ReactNode }) => (
							<ul className="list-disc ml-6 space-y-2 my-4 text-gray-300">
								{children}
							</ul>
						),
						oList: ({ children }: { children: ReactNode }) => (
							<ol className="list-decimal ml-6 space-y-2 my-4 text-gray-300">
								{children}
							</ol>
						),
					}}
				/>
				{article.tags.includes("Grátis") &&
					article.data.titulo?.includes("Epic Games") && (
						<div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 my-8 shadow-lg">
							<h1 className="text-3xl font-bold text-center mb-6 text-white">
								Perguntas Frequentes
							</h1>
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-2 text-gray-200">
										Página com Missing account id
									</h2>
									<p className="text-gray-300">
										Logue na Epic Games primeiro no{" "}
										<b>seu navegador habitual</b>. Não use navegadores
										diferentes no processo.
									</p>
								</div>
								<div>
									<h2 className="text-xl font-semibold mb-2 text-gray-200">
										O checkout deu erro "Não foi possível completar esta compra"
									</h2>
									<p className="text-gray-300">
										Você já tem <b>um ou mais jogos</b> do carrinho na sua
										biblioteca. Se faltar algum, use a própria página da Epic
										Games para adicionar.
									</p>
								</div>
								<div>
									<h2 className="text-xl font-semibold mb-2 text-gray-200">
										Preciso instalar a loja?
									</h2>
									<p className="text-gray-300">
										Não, <b>você nunca será obrigado</b> a instalar a Epic Games
										para resgatar qualquer jogo. A instalação de jogos pode ser
										exigido o programa, porém é possível instalar jogos no PC
										com scripts em launchers externos.
									</p>
								</div>
								<div>
									<h2 className="text-xl font-semibold mb-2 text-gray-200">
										Existe algum padrão na Epic Games?
									</h2>
									<p className="text-gray-300">
										Sim, a Epic Games possui um padrão de oferecer jogos
										gratuitos para PC e Mobile nas quintas-feiras às{" "}
										<b>15h ou 16h (Lisboa) | 11h ou 12h (Brasília)</b> e podem
										ser resgatados durante 1 semana. Exceto campanhas de Natal
										em que é só possível resgatar durante 24 horas e sendo um
										jogo novo todos os dias.
									</p>
								</div>
							</div>
						</div>
					)}
				{reviewWithSteamPage?.steam_page?.url && (
					<div className="my-8 rounded-xl overflow-hidden shadow-xl">
						<iframe
							src={reviewWithSteamPage.steam_page.url as string}
							title="Steam page"
							height="190"
							className="w-full aspect-video"
						/>
					</div>
				)}
			</div>
			<div className="w-full space-y-8 mt-2">
				{article.data.review[0]?.estado && (
					<>
						<hr className="border-t-2 border-gray-700" />
						<div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg">
							<div className="flex max-md:flex-col gap-6 items-center">
								<img
									src={cdn(article.data.cover.url as string, 400, 0)}
									className="rounded-xl aspect-video w-full md:w-48 object-cover shadow-md"
									alt={article.data.cover.alt || ""}
								/>
								<div className="flex-1 flex flex-col max-md:items-center max-md:text-center">
									<h1 className="text-2xl font-bold text-white mb-2">
										{article.data.titulo?.replace("Review - ", "")}
									</h1>
									<PrismicRichText
										field={article.data.review[0]?.descricao}
										components={{
											paragraph: ({ text }: { text: ReactNode }) => (
												<p className="text-gray-300 leading-relaxed">{text}</p>
											),
										}}
									/>
									<p className="text-sm mt-3 text-gray-400">
										Descobre como funciona o nosso sistema de notas, lendo a
										nossa{" "}
										<Link
											href={"/review-policy"}
											className="text-red-500 hover:text-red-400 font-medium"
										>
											política de análises
										</Link>
										.
									</p>
								</div>
								<div className="flex items-center justify-center p-4">
									{reviewWithSteamPage.rating === "Feliz" && (
										<RiEmotionHappyFill className="w-20 h-20 text-green-500 drop-shadow-lg" />
									)}
									{reviewWithSteamPage.rating === "Mediano" && (
										<RiEmotionNormalFill className="w-20 h-20 text-yellow-500 drop-shadow-lg" />
									)}
									{reviewWithSteamPage.rating === "Desiludido" && (
										<RiEmotionUnhappyFill className="w-20 h-20 text-red-500 drop-shadow-lg" />
									)}
								</div>
							</div>
						</div>
					</>
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
				<Script src="https://platform.twitter.com/widgets.js" async />
			</div>
		</article>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

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
				description: post.data.seo_description
					? post.data.seo_description
					: `Leia "${post.data.titulo}" de ${
							myAuthorData.uid.charAt(0).toUpperCase() +
							myAuthorData.uid.slice(1)
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
					description: post.data.seo_description
						? post.data.seo_description
						: `Leia "${post.data.titulo}" de ${
								myAuthorData.uid.charAt(0).toUpperCase() +
								myAuthorData.uid.slice(1)
							} na Império Network agora mesmo. A sua leitura vai valer a pena!`,
					images: [cdn(post.data.cover.url as string, 1920, 0)],
					card: "summary_large_image",
				},
			}
		: {};
}
