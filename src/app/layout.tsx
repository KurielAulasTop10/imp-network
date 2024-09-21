import Header from "@/components/Header";
import ScrollUpButton from "@/components/ScrollUpButton";
import "@/styles/globals.css";
import "@/styles/paginate.css";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Rubik } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const viewport: Viewport = {
	themeColor: "#dd3333",
	colorScheme: "dark",
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
			"A Império Network é o seu portal de notícias de tecnologia, gaming ou animes em português! Tornamos a sua leitura simples.",
		images: ["/logo.png"],
		card: "summary",
	},
};

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body className="bg-primary text-primary relative mx-auto flex w-full flex-col">
				<main className={rubik.className} suppressHydrationWarning>
					<Header />
					{children}
					<div className="fixed bottom-12 right-10">
						<ScrollUpButton />
					</div>
					<div className="mt-[4rem] md:mt[6rem]">
						<Footer />
					</div>
					<Script id="clarity-script" strategy="afterInteractive">
						{`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mqctv9wnae");
          `}
					</Script>
					<Script
						src="https://cookieinfoscript.com/js/cookieinfo.min.js"
						type="text/javascript"
						id="cookieinfo"
						data-linkmsg="Mais informação"
						data-message="Nós usamos cookies para aprimorar sua experiência. Ao continuar visitando nosso site você concorda com o uso de cookies."
						data-bg="#000"
						data-fg="#fff"
						data-divlink="#fff"
						data-divlinkbg="#dd3333"
						data-link="#dd3333"
					/>

					<Script
						src="https://website-widgets.pages.dev/dist/sienna.min.js"
						defer
					/>
				</main>
				<GoogleAnalytics gaId="G-FWY182VERW" />
			</body>
		</html>
	);
}
