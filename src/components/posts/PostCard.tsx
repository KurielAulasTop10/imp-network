"use client";

import Image from "next/image";
import Link from "next/link";

import type { AuthorDocument, PostDocument } from "../../../prismicio-types";
import { createClient } from "@/prismicio";
import { useEffect, useState } from "react";

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

	return loading ? (
		<article className="rounded-md bg-stone-900 w-full h-80 animate-pulse p-2 mx-auto" />
	) : (
		<article className="rounded-md bg-black w-full h-full hover:opacity-70 transition-all duration-300 p-2 mx-auto flex flex-col">
			<Link href={`/post/${post.uid}`}>
				<div className="relative h-60 overflow-hidden mb-2">
					<Image
						src={post.data.cover.url || ""}
						alt={post.data.cover.alt || ""}
						fill
						quality={50}
						className="object-cover aspect-video"
					/>
					<Link
						href={`/categoria/${post.tags[0]}`}
						className="absolute top-0 left-0 bg-red-600 px-2 py-1 text-white text-sm capitalize font-normal rounded-b-md"
					>
						{post.tags[0]}
					</Link>
					{post.tags.includes("grátis") && (
						<Image
							alt={`${post.data.titulo} Logo`}
							src={frees[getFreeSource(post.data.titulo as string)]}
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
						{post.data.titulo}
					</h3>
					<div
						style={{
							background: `url(${authorData?.data.banner.url})`,
						}}
						className="rounded-md bg-center bg-cover"
					>
						<div className="flex gap-3 items-center h-full w-full bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-2">
							<Image
								src={authorData?.data.avatar.url || ""}
								className="rounded-md w-12 h-12"
								quality={50}
								width={128}
								height={128}
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
					</div>
				</div>
			</Link>
		</article>
	);
}
