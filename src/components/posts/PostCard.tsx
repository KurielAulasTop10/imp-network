"use client";

import Link from "next/link";

import type { AuthorDocument, PostDocument } from "../../../prismicio-types";
import { createClient } from "@/prismicio";
import { useEffect, useState } from "react";
import { cdn } from "@/utils/cdn";

export default function PostCard({ post }: { post: PostDocument }) {
	const client = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
	});
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
		"Xbox Store": "https://i.ibb.co/x5XskjC/4xbmz8O.png",
		"PlayStation Store": "https://i.ibb.co/PC0tdw4/qMaP7m0.png",
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
			<article className="rounded-md bg-black w-full h-full hover:outline-1 outline-offset-2 outline-red-600 transition-all duration-300 p-2 mx-auto flex flex-col justify-between">
				<div className="w-full h-full">
					<div className="relative overflow-hidden mb-2">
						<img
							src={cdn(post.data.cover.url as string, 640, 360)}
							alt={post.data.cover.alt || ""}
							className="w-full"
						/>
						<Link
							href={`/categoria/${post.tags[0]}`}
							className="absolute top-0 left-0 px-2 py-1 text-white bg-red-600/60 hover:bg-red-600 hover:text-white text-sm capitalize font-normal rounded-b-md"
						>
							{post.tags[0]}
						</Link>
						{post.tags.includes("Grátis") && (
							<img
								src={cdn(
									frees[getFreeSource(post.data.titulo as string)],
									0,
									0,
								)}
								alt={`${post.data.titulo} Logo`}
								className="absolute bottom-2 left-1 w-10"
							/>
						)}
					</div>
					<div className="flex justify-start border-l-4 border-red-600 pl-2">
						<h3 className="text-lg font-normal text-white text-justify line-clamp-2">
							{post.data.titulo}
						</h3>
					</div>
				</div>

				<div className="flex gap-3 items-center h-full w-full bg-zinc-950 rounded-md mt-2 p-2">
					<img
						src={cdn(authorData?.data.avatar.url as string, 48, 48)}
						className="rounded-md w-12 h-12"
						alt={authorData?.data.avatar.alt || ""}
					/>
					<div className="flex flex-col">
						<span className="text-gray-200 text-lg font-light capitalize">
							{authorData?.uid.replaceAll("-", " ")}
						</span>
						<p className="text-sm text-gray-400 flex font-thin">
							{new Date(`${post.data.data}`).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
				</div>
			</article>
		</Link>
	);
}
