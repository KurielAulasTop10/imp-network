import { authors } from "@/app/data/authors";
import type { Authors } from "@/types/authors";
import type { Post } from "@/types/post";
import Image from "next/image";

export default function AuthorBox({ post: { author } }: { post: Post }) {
	const authorInfo = authors[author as keyof Authors];

	return (
		<div
			style={{
				background: `url(${authorInfo.bannerURL})`,
			}}
			className="rounded-md bg-center bg-cover"
		>
			<div className="flex gap-3 items-center h-full w-full bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-2">
				<Image
					src={authorInfo.imgURL}
					className="rounded-md"
					width={48}
					height={48}
					quality={30}
					alt={`Avatar de ${authorInfo.name}`}
				/>
				<div className="flex flex-col">
					<span className="flex text-white text-lg font-light items-center gap-2">
						{authorInfo.name}
						<span className="text-xs text-gray-300 bg-red-600 w-fit px-1 rounded-sm font-thin">
							Autor
						</span>
					</span>
					<p className="text-sm text-gray-200 flex font-thin">
						{authorInfo.description}
					</p>
				</div>
			</div>
		</div>
	);
}
