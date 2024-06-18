"use client";

import Link from "next/link";
import { DropdownMenu, ThemeProvider } from "@gravity-ui/uikit";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Header() {
	return (
		<ThemeProvider theme="dark">
			<nav className="w-full relative">
				<div className="blur-sm bg-[url(https://i.ibb.co/XSMYhNc/XTAAuLY.webp)] bg-cover bg-center w-full h-60 z-10" />
				<Link href="/">
					<img
						src="/logo.png"
						alt="Império Network Logo"
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 h-40 md:h-32 xl:h-52 p-3"
					/>
				</Link>
				<div className="h-12 bg-black w-full text-white flex justify-between items-center px-5 rounded-b-md">
					<div className="w-full text-white font-normal uppercase flex gap-3 items-center justify-center text-sm">
						<Link href={"/categoria/anime"} className="hover:text-red-600">
							Animes
						</Link>
						<DropdownMenu
							renderSwitcher={(props) => (
								<p {...props} className="hover:text-red-600 flex items-center">
									Games <RiArrowDropDownLine className="w-7 h-7" />
								</p>
							)}
							items={[
								{
									href: "/categoria/grátis",
									text: "Grátis",
								},
								{
									href: "/categoria/notícia",
									text: "Notícias",
								},
								{
									href: "/categoria/guia",
									text: "Guias",
								},
							]}
						/>
						<Link href={"/categoria/review"} className="hover:text-red-600">
							Reviews
						</Link>
						<Link href={"/categoria/tech"} className="hover:text-red-600">
							Tech
						</Link>
					</div>
				</div>
			</nav>
		</ThemeProvider>
	);
}
