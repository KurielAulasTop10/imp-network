import { PrismicRichText } from "@prismicio/react";
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
import Ad from "@/components/posts/Ad";
import AuthorBox from "@/components/posts/AuthorBox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { cdn } from "@/utils/cdn";
import { calculateReadingTime } from "@/utils/reading-time";

export default function PostPageContent({ article, author, adsSorted }: any) {
	const readingTime = calculateReadingTime(article.data.editor);
	const reviewWithSteamPage = article.data.review?.[0] || {};

	return (
		<article
			className={cn(
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
				{!!article.data.resume?.length && (
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
							<PrismicRichText field={article.data.resume} />
						</div>
					</div>
				)}

				<PrismicRichText
					field={article.data.editor}
					components={{
						heading1: ({ text }: any) => (
							<h1 className="text-4xl font-bold mt-8 mb-4 text-white border-b-2 border-red-500 pb-2">
								{text}
							</h1>
						),
						heading2: ({ text }: any) => (
							<h2 className="text-3xl font-bold mt-6 mb-3 text-white">
								{text}
							</h2>
						),
						heading3: ({ text }: any) => (
							<h3 className="text-2xl font-bold mt-5 mb-3 text-white">
								{text}
							</h3>
						),
						heading4: ({ text }: any) => (
							<h4 className="text-xl font-bold mt-4 mb-2 text-white">{text}</h4>
						),
						paragraph: ({ children, text }: any) => {
							if (text?.startsWith("!vid")) {
								return (
									<video
										src={text.replace("!vid", "")}
										controls
										className="rounded-xl w-full aspect-video shadow-lg my-6"
									/>
								);
							}
							if (text?.startsWith("!gif")) {
								return (
									<Dialog>
										<DialogTrigger asChild>
											<div className="my-6 rounded-xl overflow-hidden shadow-lg cursor-pointer">
												<img
													src={text.replace("!gif", "")}
													alt="GIF"
													className="w-full h-auto transition-transform duration-500 hover:scale-105"
													loading="lazy"
												/>
											</div>
										</DialogTrigger>
										<DialogContent className="border-0 bg-transparent p-0 shadow-none sm:max-w-full max-h-[90vh]">
											<div className="h-[calc(100vh-150px)] w-full overflow-clip rounded-md bg-transparent shadow-none">
												<img
													src={text.replace("!gif", "")}
													alt="GIF"
													className="h-full w-full object-contain"
												/>
											</div>
										</DialogContent>
									</Dialog>
								);
							}
							if (text?.startsWith("!aud")) {
								return (
									<audio
										controls
										autoPlay
										loop
										className="w-full shadow-lg rounded-lg my-4"
										controlsList="noplaybackrate nodownload"
									>
										<source src={text.replace("!aud", "")} />
									</audio>
								);
							}
							if (text?.startsWith("!warn")) {
								return (
									<div className="flex items-start gap-3 p-4 my-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
										<RiAlertLine className="text-yellow-400 text-xl mt-0.5 shrink-0" />
										<p className="text-yellow-200">
											{text.replace("!warn ", "")}
										</p>
									</div>
								);
							}
							if (text?.startsWith("!spoiler")) {
								return (
									<span className="bg-gray-700 text-gray-700 hover:text-white px-2 py-1 rounded-md transition-all duration-300 cursor-pointer">
										{text.replace("!spoiler ", "")}
									</span>
								);
							}
							return (
								<div className="my-4">
									{Math.floor(Math.random() * 15) + 1 === 5 &&
										adsSorted[0]?.data?.link && (
											<Ad
												ad={adsSorted}
												index={Math.floor(Math.random() * adsSorted.length)}
											/>
										)}
									<p className="leading-relaxed text-justify">{children}</p>
								</div>
							);
						},
						preformatted: ({ text }: any) => (
							<div className="relative bg-linear-to-br from-gray-900 to-black p-6 rounded-xl my-6 overflow-hidden">
								<RiDoubleQuotesR className="absolute top-2 left-2 w-12 h-12 text-gray-800 opacity-50" />
								<blockquote className="relative z-10 text-white font-mono text-sm leading-relaxed">
									{text}
								</blockquote>
							</div>
						),
						embed: ({ node }: any) =>
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
									dangerouslySetInnerHTML={{ __html: node.oembed.html }}
									className="w-full flex items-center justify-center my-6"
								/>
							),
						image: ({ node }: any) => (
							<Dialog>
								<DialogTrigger asChild>
									<div className="my-6 rounded-xl overflow-hidden shadow-lg cursor-pointer">
										<img
											src={cdn(node.url, 1920, 0)}
											alt={node.alt as string}
											className="w-full h-auto transition-transform duration-500 hover:scale-105"
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
						),
						hyperlink: ({ node, children }: any) => (
							<a
								href={node.data.url as string}
								target={
									node.data.url?.includes("imperionetwork.fr")
										? undefined
										: "_blank"
								}
								rel={
									node.data.url?.includes("imperionetwork.fr")
										? undefined
										: "noopener noreferrer"
								}
								className={
									article.tags.includes("Grátis")
										? "inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
										: "text-red-500 hover:text-red-400 font-medium border-b-2 border-red-600 hover:border-red-400 transition-all duration-200"
								}
							>
								{article.tags.includes("Grátis") && <RiExternalLinkLine />}
								{children}
							</a>
						),
						list: ({ children }: any) => (
							<ul className="list-disc ml-6 space-y-2 my-4 text-gray-300">
								{children}
							</ul>
						),
						oList: ({ children }: any) => (
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
										para resgatar qualquer jogo.
									</p>
								</div>
								<div>
									<h2 className="text-xl font-semibold mb-2 text-gray-200">
										Existe algum padrão na Epic Games?
									</h2>
									<p className="text-gray-300">
										Sim, a Epic Games possui um padrão de oferecer jogos
										gratuitos nas quintas-feiras às{" "}
										<b>15h ou 16h (Lisboa) | 11h ou 12h (Brasilília)</b>.
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
				{article.data.review?.[0]?.estado && (
					<>
						<hr className="border-t-2 border-gray-700" />
						<div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg">
							<div className="flex max-md:flex-col gap-6 items-center">
								<img
									src={cdn(article.data.cover.url as string, 400, 0)}
									className="rounded-xl aspect-video w-full md:w-48 object-cover shadow-md"
									alt={article.data.cover.alt || ""}
									loading="lazy"
								/>
								<div className="flex-1 flex flex-col max-md:items-center max-md:text-center">
									<h1 className="text-2xl font-bold text-white mb-2">
										{article.data.titulo?.replace("Review - ", "")}
									</h1>
									<PrismicRichText
										field={article.data.review[0]?.descricao}
										components={{
											paragraph: ({ text }: any) => (
												<p className="text-gray-300 leading-relaxed">{text}</p>
											),
										}}
									/>
									<p className="text-sm mt-3 text-gray-400">
										Descobre como funciona o nosso sistema de notas, lendo a
										nossa{" "}
										<a
											href="/review-policy"
											className="text-red-500 hover:text-red-400 font-medium"
										>
											política de análises
										</a>
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
				<AuthorBox uid={author.uid} data={author.data} />
				<script src="https://platform.twitter.com/widgets.js" async />
			</div>
		</article>
	);
}
