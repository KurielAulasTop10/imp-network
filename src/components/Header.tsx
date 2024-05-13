'use client';

import Link from 'next/link';
import { DropdownMenu, ThemeProvider } from '@gravity-ui/uikit';
import { IoMdArrowDropdown, IoMdPause, IoMdPlayCircle } from 'react-icons/io';
import { useState } from 'react';

export default function Header() {
	const [muted, setMuted] = useState(false);
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
				<div className="h-14 bg-black w-full text-white flex justify-between items-center px-5">
					<div className="w-full text-white font-semibold uppercase flex gap-3 items-center justify-center text-base">
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
					{muted ? (
						<IoMdPlayCircle
							onClick={() => setMuted(!muted)}
							className="cursor-pointer hover:text-red-600 w-8 h-8"
						/>
					) : (
						<IoMdPause
							onClick={() => setMuted(!muted)}
							className="cursor-pointer hover:text-red-600 w-8 h-8"
						/>
					)}
					<audio autoPlay muted={muted}>
						<source
							src="https://relay.rainwave.cc/all.ogg?1:WkRwYC6eDV"
							type="audio/ogg"
						/>
					</audio>
				</div>
			</nav>
		</ThemeProvider>
	);
}
