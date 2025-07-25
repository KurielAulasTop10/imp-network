import Header from "@/components/Header";
import ScrollUpButton from "@/components/ScrollUpButton";
import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
	themeColor: "#dd3333",
};

export const metadata: Metadata = {
	authors: [{ name: "Império Network" }],
	title: {
		default: "Império Network",
		template: "%s | Império Network",
	},
	description:
		"A Império Network é o seu portal de notícias de tecnologia, gaming ou animes em português! Tornamos a sua leitura simples.",
	keywords: [
		"império",
		"network",
		"gaming",
		"animes",
		"notícias",
		"tecnologia",
		"tech",
	],
	openGraph: {
		type: "website",
		title: {
			default: "Império Network",
			template: "%s | Império Network",
		},
		siteName: "Império Network",
		images: [
			{
				url: "/logo.png",
			},
		],
	},
	twitter: {
		title: {
			default: "Império Network",
			template: "%s | Império Network",
		},
		description:
			"A Império Network é o seu portal de notícias de tecnologia, gaming e animes em português! Tornamos a sua leitura simples.",
		images: ["/logo.png"],
		card: "summary",
	},
};

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className="bg-[url('/bg.png')] text-primary relative mx-auto flex w-full flex-col">
				<main className={rubik.className}>
					<Header />
					{children}
					<div className="fixed bottom-12 right-10">
						<ScrollUpButton />
					</div>
					<div className="mt-10">
						<Footer />
					</div>
					<PrismicPreview repositoryName="imperio-network" />
				</main>
			</body>
		</html>
	);
}
