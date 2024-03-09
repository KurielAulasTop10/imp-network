'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/types/post';

export default function PostCard({
	post: { slug, title, date, cover, categories, author },
}: {
	post: Post;
}) {
	return (
		<Link href={`/post/${slug}`}>
			<article className="mx-auto flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.05]">
				<div className="relative h-60 overflow-hidden mb-4">
					<Image
						src={cover}
						alt={title}
						fill
						quality={70}
						className="object-cover aspect-video"
					/>
					<div className="absolute bottom-0 left-2 bg-red-600 px-2 py-1 text-white text-sm uppercase font-semibold">
						{categories[0]}
					</div>
				</div>
				<div className="flex flex-col">
					<h3 className="text-lg md:text-lg font-bold mb-2 flex gap-3 items-start justify-start">
						<div className="w-1 h-6 bg-red-600" />
						{title}
					</h3>
					<p className="mb-4 text-sm text-gray-400 flex gap-1 uppercase font-semibold">
						<span className="text-red-600">{author}</span> -{' '}
						{new Date(
							date.replace(/-/g, "/") + " 00:00:00",
						).toLocaleDateString("pt-BR", {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}{' '}
						-{' '}
						<Link
							href={'/categoria/' + categories[0]}
							className="text-red-600 hover:text-red-400"
						>
							{categories[0]}
						</Link>
					</p>
				</div>
			</article>
		</Link>
	);
}
