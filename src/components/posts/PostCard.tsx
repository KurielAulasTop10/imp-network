"use client";

import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/types/post";
import { authors } from "@/app/data/authors";
import type { Authors } from "@/types/authors";

export default function PostCard({
	post: { slug, title, date, cover, categories, author },
}: {
	post: Post;
}) {
	const frees = {
		"Epic Games": "https://i.imgur.com/JsAPPOC.png",
		Steam: "https://i.imgur.com/oEhWYim.png",
		GOG: "https://i.imgur.com/u8RRwED.png",
		"Microsoft Store": "https://i.imgur.com/JfegpEx.png",
		"Xbox Store": "https://i.imgur.com/4xbmz8O.png",
		"PlayStation Store": "https://i.imgur.com/qMaP7m0.png",
	};

	function getFreeSource(title: string): keyof typeof frees {
		const platforms = Object.keys(frees);

		for (const platform of platforms) {
			if (title.includes(platform)) {
				return platform as keyof typeof frees;
			}
		}

		return "GOG";
	}

	return (
		<Link href={`/post/${slug}`}>
			<article
				style={{
					backgroundImage: `url(${cover})`,
				}}
				className="rounded-md md:bg-center md:bg-cover max-sm:!bg-black w-full h-full hover:scale-[1.05] transition-all duration-300"
			>
				<div className="mx-auto w-full h-full flex flex-col overflow-hidden md:bg-clip-padding md:backdrop-filter bg-black md:backdrop-blur-sm md:bg-opacity-30 rounded-md p-2">
					<div className="relative h-60 overflow-hidden mb-2">
						<Image
							src={cover}
							alt={`Thumbnail de ${title}`}
							fill
							quality={50}
							className="object-cover aspect-video"
						/>
						<Link
							href={`/categoria/${categories[0]}`}
							className="absolute top-0 left-0 bg-red-600 px-2 py-1 text-white text-sm capitalize font-normal rounded-b-md"
						>
							{categories[0]}
						</Link>
						{categories.includes("grátis") && (
							<Image
								alt={`${title} Logo`}
								src={frees[getFreeSource(title)]}
								width={60}
								height={60}
								quality={30}
								className="absolute bottom-2 left-1 w-10"
							/>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-normal flex gap-2 items-center justify-start text-white">
							<div className="w-1 h-5 bg-red-600 rounded-r-md" />
							{title}
						</h3>
						<div
							style={{
								background: `url(${authors[author as keyof Authors].bannerURL})`,
							}}
							className="rounded-md bg-center bg-cover"
						>
							<div className="flex gap-3 items-center h-full w-full bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-2">
								<Image
									src={authors[author as keyof Authors].imgURL}
									className="rounded-md w-12 h-12"
									quality={50}
									width={128}
									height={128}
									alt={`${author} avatar`}
								/>
								<div className="flex flex-col">
									<span className="text-gray-200 text-lg font-light">
										{author}
									</span>
									<p className="text-sm text-gray-400 flex font-thin">
										{new Date(
											`${date.replace(/-/g, "/")} 00:00:00`,
										).toLocaleDateString("pt-BR", {
											day: "2-digit",
											month: "long",
											year: "numeric",
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
}
