import SearchBar from "@/components/SearchBar";
import PostsGrid from "@/components/posts/PostsGrid";
import { getAllPostsFromNotion } from "@/services/posts";
import Link from "next/link";
import { BsInstagram, BsThreads, BsTiktok, BsTwitch, BsWhatsapp, BsYoutube } from "react-icons/bs";

export const revalidate = 60;

export default async function BlogPage() {
	const allPosts = await getAllPostsFromNotion();

	return (
		<div className="flex flex-col xl:flex-row justify-between items-start md:items-center xl:items-start mt-5 md:mt-10 mx-auto px-2 md:px-5 w-full gap-10">
			<div className="w-full">
				<PostsGrid allPosts={allPosts} />
			</div>
			<div className="w-full md:w-1/4 flex gap-4 flex-col xl:sticky xl:top-10">
				<SearchBar />
				<h3 className="w-full p-2 uppercase bg-black text-white font-normal rounded-md">
					Entre no nosso Discord
				</h3>
				<Link
					href="https://discord.gg/for-you-856873114926972929"
					target="_blank"
				>
					<img
						alt="Discord Server"
						src="https://discordapp.com/api/guilds/856873114926972929/embed.png?style=banner2&cachebypass=1608373082.412"
						className="w-full rounded-md"
					/>
				</Link>
				<h3 className="w-full p-2 bg-black text-white font-normal rounded-md">
					SIGA-NOS NAS REDES SOCIAIS
				</h3>
				<div className="grid grid-cols-3 gap-3">
					<Link
						href="https://www.threads.net/@imperionetwork6"
						className="w-full flex bg-black hover:invert p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
						target="_blank"
					>
						<BsThreads />
					</Link>
					<Link
						href="https://www.instagram.com/imperionetwork6"
						className="w-full flex bg-gradient-to-r hover:invert from-[#ee2a7b] to-[#6228d7] p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
						target="_blank"
					>
						<BsInstagram />
					</Link>
					<Link
						href="https://whatsapp.com/channel/0029VagzzeBBqbr3DWorwm1i"
						className="w-full flex bg-green-600 hover:text-black p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
						target="_blank"
					>
						<BsWhatsapp />
					</Link>
					<Link
						href="https://www.youtube.com/@imperionetwork"
						className="w-full flex bg-[#FF0000] hover:text-black p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
						target="_blank"
					>
						<BsYoutube />
					</Link>
					<Link
						href="https://www.twitch.tv/imp3rionetwork"
						className="w-full flex bg-gradient-to-r hover:text-black from-[#772CE8] to-[#9146FF] p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
						target="_blank"
					>
						<BsTwitch />
					</Link>
					<Link
						href="https://www.tiktok.com/@kurieldev"
						className="w-full flex bg-black hover:invert p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
						target="_blank"
					>
						<BsTiktok />
					</Link>
				</div>
			</div>
		</div>
	);
}
