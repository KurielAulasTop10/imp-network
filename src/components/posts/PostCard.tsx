/** biome-ignore-all lint/performance/noImgElement: <> */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { cdn } from "@/utils/cdn";
import type { AuthorDocument, PostDocument } from "../../../prismicio-types";

export default function PostCard({ post }: { post: PostDocument }) {
	const client = createClient();
	const [authorData, setAuthorData] = useState<AuthorDocument | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAuthorData = async () => {
			interface MyAuthorData {
				uid?: string;
			}

			const myAuthorData = post.data.author as unknown as MyAuthorData;
			if (!myAuthorData?.uid) {
				console.error("Author UID not found");
				return;
			}

			const data = await client.getByUID("author", myAuthorData.uid);
			setAuthorData(data as AuthorDocument);
			setLoading(false);
		};

		fetchAuthorData();
	}, [client, post]);

	const frees = {
		"Epic Games": "https://i.ibb.co/Sfz3dsz/JsAPPOC.png",
		Steam: "https://i.ibb.co/jwYJRbs/oEhWYim.png",
		GOG: "https://i.ibb.co/t2NxFCz/u8RRwED.png",
		"Microsoft Store": "https://i.ibb.co/r6jqsyg/JfegpEx.png",
		"Xbox Store": "https://i.ibb.co/nq3GNMrK/20228.png",
		"PlayStation Store": "https://i.ibb.co/PC0tdw4/qMaP7m0.png",
		Xbox: "https://i.ibb.co/nq3GNMrK/20228.png",
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

	return loading ? (
		<div className="p-4 rounded-md shadow-sm animate-pulse bg-black">
			<div className="flex items-center justify-center h-48 mb-4 bg-gray-700">
				<svg
					className="w-10 h-10 text-gray-600"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 20"
				>
					<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
					<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
				</svg>
			</div>
			<div className="h-2.5 rounded-full bg-gray-700 mb-4" />
			<div className="h-2.5 rounded-full bg-gray-700" />
			<div className="flex items-center mt-4 bg-gray-700 w-full rounded-md p-2">
				<svg
					className="w-10 h-10 me-3 text-gray-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
				</svg>
				<div>
					<div className="h-2.5 rounded-full bg-gray-500 w-32 mb-2" />
					<div className="w-48 h-2 rounded-full bg-gray-500" />
				</div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	) : (
		<Link href={`/post/${post.uid}`}>
			<article
				className="relative rounded-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 bg-center bg-no-repeat bg-cover aspect-video"
				style={{
					backgroundImage: `url(${cdn(post.data.cover.url as string, 640, 360)})`,
				}}
			>
				{post.tags.includes("Grátis") && (
					<img
						src={cdn(frees[getFreeSource(post.data.titulo as string)], 0, 0)}
						alt={`${post.data.titulo} Logo`}
						className="absolute top-2 left-1 w-10"
						loading="lazy"
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
				<div className="absolute bottom-1 left-2 right-1 mb-0.5">
					<h3 className="text-lg text-white font-medium hover:text-red-400">
						{post.data.titulo}
					</h3>
					<div className="flex gap-3 items-center h-full w-full mt-0.5">
						<img
							src={cdn(authorData?.data.avatar.url as string, 28, 28)}
							className="rounded-full w-7 h-7"
							alt={authorData?.data.avatar.alt || ""}
							loading="lazy"
						/>
						<div className="flex flex-col">
							<span className="text-gray-200 text-sm font-light capitalize">
								{authorData?.uid.replaceAll("-", " ")}
							</span>
							<p className="text-xs text-gray-400 flex font-extralight">
								{new Date(`${post.data.data}`).toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</p>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
}
