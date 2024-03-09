'use client';

import Link from 'next/link';
import { DropdownMenu, ThemeProvider } from '@gravity-ui/uikit';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function Header() {
	return (
		<ThemeProvider theme="dark">
			<nav className="w-full relative">
				<div className="blur-sm bg-[url(https://i.imgur.com/XTAAuLY.jpeg)] bg-cover bg-center w-full h-60 z-10" />
				<Link href="/">
					<img
						src="/logo.png"
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 h-40 md:h-32 xl:h-52 p-3"
					/>
				</Link>
				<div className="h-14 w-full bg-black text-white font-semibold uppercase flex gap-3 items-center justify-center text-base">
					<Link
						href={'/categoria/anime'}
						className="hover:text-red-600"
					>
						Animes
					</Link>
					<DropdownMenu
						renderSwitcher={props => (
							<p
								{...props}
								className="hover:text-red-600 flex gap-1 items-center"
							>
								Games <IoMdArrowDropdown />
							</p>
						)}
						items={[
							{
								href: '/categoria/grátis',
								text: 'Grátis',
							},
							{
								href: '/categoria/notícia',
								text: 'Notícias',
							},
							{
								href: '/categoria/guia',
								text: 'Guias',
							},
						]}
					/>
					<Link
						href={'/categoria/review'}
						className="hover:text-red-600"
					>
						Reviews
					</Link>
					<Link
						href={'/categoria/tech'}
						className="hover:text-red-600"
					>
						Tech
					</Link>
				</div>
			</nav>
		</ThemeProvider>
	);
}
