import Link from "next/link";
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

	return (
		<footer className="bg-black flex flex-col gap-3 w-full p-5 justify-center text-center rounded-t-md">
			<div className="uppercase font-normal flex flex-row gap-7 w-full text-center justify-center">
				{links.map(({ title, href }) => (
					<Link
						href={href}
						key={href}
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
	);
}
