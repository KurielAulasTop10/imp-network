import SearchBar from "@/components/SearchBar";
import PostsGrid from "@/components/posts/PostsGrid";
import { getAllPostsFromNotion } from "@/services/posts";
import Link from "next/link";
import { BsInstagram, BsTiktok, BsTwitch, BsYoutube } from "react-icons/bs";

export const revalidate = 60;

export default async function BlogPage() {
	const allPosts = await getAllPostsFromNotion();

	return (
		<div className="flex flex-col md:flex-row justify-between items-start mt-5 md:mt-10 mx-auto px-2 md:px-20 w-full gap-10">
			<div className="w-full">
				<PostsGrid allPosts={allPosts} />
			</div>
			<div className="w-full md:w-1/4 flex flex-col sticky top-10">
				<SearchBar />
				<h3 className="w-full p-3 uppercase my-4 bg-black text-white font-semibold">
					ENTRE NO NOSSO DISCORD
				</h3>
				<Link
					href="https://discord.gg/for-you-856873114926972929"
					target="_blank"
				>
					<img
						alt="Discord Server"
						src="https://discordapp.com/api/guilds/856873114926972929/embed.png?style=banner2&cachebypass=1608373082.412"
						className="w-full"
					/>
				</Link>
				<h3 className="w-full p-3 uppercase my-4 bg-black text-white font-semibold">
					SIGA-NOS NAS REDES SOCIAIS
				</h3>
				<div className="grid grid-cols-2 gap-3">
					<Link
						href="https://www.youtube.com/@imperionetwork"
						className="w-full flex bg-[#FF0000] hover:opacity-80 p-2 items-center justify-center font-semibold text-lg gap-2 rounded-sm"
						target="_blank"
					>
						<BsYoutube />
						<p>Youtube</p>
					</Link>
					<Link
						href="https://www.twitch.tv/imp3rionetwork"
						className="w-full flex bg-gradient-to-r hover:opacity-80 from-[#772CE8] to-[#9146FF] p-2 items-center justify-center font-semibold text-lg gap-2 rounded-sm"
						target="_blank"
					>
						<BsTwitch />
						<p>Twitch</p>
					</Link>
					<Link
						href="https://www.instagram.com/imperionetwork6"
						className="w-full flex bg-gradient-to-r hover:opacity-80 from-[#ee2a7b] to-[#6228d7] p-2 items-center justify-center font-semibold text-lg gap-2 rounded-sm"
						target="_blank"
					>
						<BsInstagram />
						<p>Instagram</p>
					</Link>
					<Link
						href="https://discord.gg/for-you-856873114926972929"
						className="w-full flex bg-black hover:opacity-80 p-2 items-center justify-center font-semibold text-lg gap-2 rounded-sm"
						target="_blank"
					>
						<BsTiktok />
						<p>Tiktok</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
