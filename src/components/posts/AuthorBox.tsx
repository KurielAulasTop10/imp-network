import { authors } from "@/app/data/authors";
import type { Authors } from "@/types/authors";
import type { Post } from "@/types/post";

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
				<img
					src={authorInfo.imgURL}
					className="h-12 w-12 rounded-md"
					alt="author avatar"
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
