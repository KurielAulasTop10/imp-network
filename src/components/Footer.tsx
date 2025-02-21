"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";

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

	const pathname = usePathname();

	return pathname.endsWith("classic") ? (
		<></>
	) : (
		<>
			<footer className="bg-black flex flex-col gap-3 w-full p-5 justify-center text-center rounded-t-md">
				<div className="uppercase font-normal flex flex-row gap-7 w-full text-center justify-center">
					{links.map(({ title, href }) => (
						<Link
							href={href}
							key={title + href}
							className="text-white hover:text-red-600"
						>
							{title}
						</Link>
					))}
				</div>
				<div className="text-gray-300 w-full font-thin text-sm text-center">
					<p>©️ {new Date().getFullYear()} Império Network.</p>
					<p className="flex gap-1 w-full justify-center">
						Desenvolvido com ❤️ e ☕ por
						<Link
							href="https://kurieldev.vercel.app"
							target="_blank"
							className="text-gray-200 hover:text-red-600"
						>
							KurielDev
						</Link>
					</p>
				</div>
			</footer>
			<Script id="clarity-script" strategy="afterInteractive">
				{`(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mqctv9wnae");`}
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
			<GoogleAnalytics gaId="G-FWY182VERW" />
			<Script
				src="https://website-widgets.pages.dev/dist/sienna.min.js"
				defer
			/>
		</>
	);
}
