import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import Script from "next/script";

export default function Footer() {
	const links = [
		{
			title: "Sobre Nós",
			href: "/sobre",
		},
		{
			title: "Privacy Policy",
			href: "/privacy",
		},
		{
			title: "Contato",
			href: "/contato",
		},
	];

	return (
		<>
			<footer className="bg-gradient-to-t from-gray-900 to-gray-950 border-t border-gray-800 flex flex-col gap-6 w-full p-8 justify-center items-center rounded-t-3xl shadow-2xl">
				<div className="flex flex-wrap gap-6 justify-center items-center">
					{links.map(({ title, href }) => (
						<Link
							href={href}
							key={title + href}
							className="text-gray-300 hover:text-red-400 font-medium transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-gray-800"
						>
							{title}
						</Link>
					))}
				</div>

				<div className="text-gray-400 text-center space-y-3">
					<p className="text-lg font-light">
						©️ {new Date().getFullYear()} Império Network
					</p>

					<div className="flex items-center justify-center gap-2 text-sm">
						<span>Desenvolvido com</span>
						<span className="text-red-500 animate-pulse">❤️</span>
						<span>e</span>
						<span className="text-yellow-500">☕</span>
						<span>por</span>
						<Link
							href="https://kurieldev.vercel.app"
							target="_blank"
							className="text-gray-300 hover:text-red-400 font-medium transition-colors duration-300 border-b border-dotted border-gray-600 hover:border-red-400"
						>
							KurielDev
						</Link>
					</div>

					{/* Se quiseres ativar o parceiro oficial depois:
		<div className="mt-4 pt-4 border-t border-gray-700">
			<p className="font-bold text-lg mb-3 text-gray-200">Parceiro oficial</p>
			<Link href="https://opencritic.com/" target="_blank" className="inline-block">
				<img
					src={"/opencritic.svg"}
					className="bg-white p-3 rounded-xl w-48 h-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
					alt="OpenCritic"
				/>
			</Link>
		</div>
		*/}
				</div>
			</footer>
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
			<GoogleAnalytics gaId="G-FWY182VERW" />
			<Script
				src="https://website-widgets.pages.dev/dist/sienna.min.js"
				defer
			/>
		</>
	);
}
