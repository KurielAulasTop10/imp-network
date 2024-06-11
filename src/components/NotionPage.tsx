"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import type { Block, ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import CategoryList from "@/components/CategoryList";
import "@/styles/notion.css";
import type { Post } from "@/types/post";
import AuthorBox from "./posts/AuthorBox";
import { DiscussionEmbed } from "disqus-react";

export default function NotionPage({
	post,
	recordMap,
}: {
	post: Post;
	recordMap: ExtendedRecordMap;
}) {
	return (
		<NotionRenderer
			darkMode
			recordMap={recordMap}
			fullPage
			forceCustomImages
			showTableOfContents
			disableHeader
			pageHeader={
				<div className="mx-auto w-full !mb-5">
					<div className="flex flex-col items-start gap-3">
						<CategoryList categories={post.categories} />
						<h1 className="text-2xl font-normal">{post.title}</h1>
						<p className="text-base font-thin text-gray-400">
							{new Date(
								`${post.date.replace(/-/g, "/")} 00:00:00`,
							).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</p>
						<div className="relative aspect-video w-full rounded-md">
							<Image
								src={post.cover}
								alt={post.title}
								fill
								quality={70}
								className="object-cover w-full h-full rounded-md"
							/>
						</div>
					</div>
				</div>
			}
			pageFooter={
				<div className="w-full flex flex-col gap-10 !mt-5">
					<AuthorBox post={post} />
					<DiscussionEmbed
						shortname="imperionetwork"
						config={{
							url: `https://imperionetwork.me/post/${post.slug}`,
							identifier: post.slug,
							title: post.title,
							language: "pt_PT",
						}}
					/>
				</div>
			}
			mapImageUrl={(url, block) => mapImageUrl(url, block) || ""}
			components={{
				Code,
				Collection,
				Equation,
				Modal,
				nextImage: Image,
			}}
		/>
	);
}

const Code = dynamic(() =>
	import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
const Collection = dynamic(() =>
	import("react-notion-x/build/third-party/collection").then(
		(m) => m.Collection,
	),
);
const Equation = dynamic(() =>
	import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);

const Modal = dynamic(
	() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
	{
		ssr: false,
	},
);

export function mapImageUrl(url: string, block: Block): string | null {
	if (!url) {
		return null;
	}

	if (url.startsWith("data:")) {
		return url;
	}

	if (url.startsWith("https://images.unsplash.com")) {
		return url;
	}

	try {
		const u = new URL(url);

		if (
			u.pathname.startsWith("/secure.notion-static.com") &&
			u.hostname.endsWith(".amazonaws.com")
		) {
			if (
				u.searchParams.has("X-Amz-Credential") &&
				u.searchParams.has("X-Amz-Signature") &&
				u.searchParams.has("X-Amz-Algorithm")
			) {
				// if the URL is already signed, then use it as-is
				return url;
			}
		}
	} catch {
		// ignore invalid urls
	}

	if (url.startsWith("/images")) {
		url = `https://www.notion.so${url}`;
	}

	url = `https://www.notion.so${
		url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
	}`;

	const notionImageUrlV2 = new URL(url);
	let table = block.parent_table === "space" ? "block" : block.parent_table;
	if (table === "collection" || table === "team") {
		table = "block";
	}
	notionImageUrlV2.searchParams.set("table", table);
	notionImageUrlV2.searchParams.set("id", block.id);
	notionImageUrlV2.searchParams.set("cache", "v2");

	url = notionImageUrlV2.toString();

	return url;
}
