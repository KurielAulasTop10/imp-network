import {
	BsFacebook,
	BsInstagram,
	BsSteam,
	BsThreads,
	BsTwitch,
	BsTwitterX,
	BsWhatsapp,
	BsYoutube,
} from "react-icons/bs";
import { RiBlueskyFill } from "react-icons/ri";
import SearchBar from "@/components/SearchBar";
import { cdn } from "@/utils/cdn";

const socialLinks = [
	{
		href: "https://www.threads.net/@imperionetwork6",
		icon: BsThreads,
		color: "bg-gray-800 hover:bg-gray-700",
		label: "Threads",
	},
	{
		href: "https://www.instagram.com/imperionetwork6",
		icon: BsInstagram,
		color:
			"bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] hover:from-[#ff4d94] hover:to-[#7a3aff]",
		label: "Instagram",
	},
	{
		href: "https://whatsapp.com/channel/0029VagzzeBBqbr3DWorwm1i",
		icon: BsWhatsapp,
		color: "bg-green-600 hover:bg-green-500",
		label: "WhatsApp",
	},
	{
		href: "https://bsky.app/profile/imperionetwork.fr",
		icon: RiBlueskyFill,
		color: "bg-blue-600 hover:bg-blue-500",
		label: "Bluesky",
	},
	{
		href: "https://x.com/imperionetwork6",
		icon: BsTwitterX,
		color: "bg-black hover:bg-gray-800",
		label: "X",
	},
	{
		href: "https://www.facebook.com/profile.php?id=61560538208689",
		icon: BsFacebook,
		color: "bg-blue-700 hover:bg-blue-600",
		label: "Facebook",
	},
	{
		href: "https://steamcommunity.com/groups/imperionetwork",
		icon: BsSteam,
		color: "bg-gray-900 hover:bg-gray-800",
		label: "Steam",
	},
	{
		href: "https://www.youtube.com/@imperionetwork",
		icon: BsYoutube,
		color: "bg-[#FF0000] hover:bg-red-600",
		label: "YouTube",
	},
	{
		href: "https://www.twitch.tv/imp3rionetwork",
		icon: BsTwitch,
		color:
			"bg-gradient-to-r from-[#772CE8] to-[#9146FF] hover:from-[#8a3aff] hover:to-[#a45cff]",
		label: "Twitch",
	},
];

interface SidebarProps {
	gamesData?: { data: { id: number; url?: string; name?: string }[] };
	coversData?: { id?: number; url?: string }[];
}

export default function Sidebar({ gamesData, coversData }: SidebarProps) {
	const games = gamesData?.data || [];
	const covers = coversData || [];

	return (
		<div className="w-full flex gap-4 flex-col xl:sticky xl:top-10">
			<SearchBar />
			<div className="w-full">
				<h3 className="w-full p-2 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-md text-center mb-3">
					Entre no nosso Discord
				</h3>
				<a
					href="https://discord.gg/for-you-856873114926972929"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						alt="Discord Server"
						src="https://discordapp.com/api/guilds/856873114926972929/embed.png?style=banner2&cachebypass=1608373082.412"
						className="w-full rounded-md hover:opacity-90 transition-opacity duration-200"
					/>
				</a>
			</div>
			<div className="w-full">
				<h3 className="w-full p-2 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-md text-center mb-3">
					Siga-nos nas Redes Sociais
				</h3>
				<div className="grid grid-cols-3 gap-2">
					{socialLinks.map(({ href, icon: Icon, color, label }) => (
						<a
							key={href}
							href={href}
							className={`w-full p-2 flex items-center justify-center text-white text-lg rounded-md transition-colors duration-200 ${color}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
						>
							<Icon />
						</a>
					))}
				</div>
			</div>
			{games.length > 0 && (
				<div className="w-full">
					<h3 className="w-full p-2 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-md text-center mb-3">
						Que Jogos Lançam Hoje?
					</h3>
					<div
						className={`grid ${games.length <= 2 ? `grid-cols-${games.length}` : "grid-cols-3"} gap-3 w-full`}
					>
						{games
							.filter((game, index) => game.url && covers[index]?.id)
							.map((game) => {
								const coverIndex = games.findIndex((g) => g.id === game.id);
								return (
									<a
										target="_blank"
										href={game.url as string}
										key={game.id}
										rel="noopener noreferrer"
										className="group block relative overflow-hidden rounded-md"
									>
										<img
											src={cdn(
												`https:${covers[coverIndex]?.url?.replace("t_thumb", "t_cover_big")}`,
												264,
												352,
											)}
											alt={game.name as string}
											className="w-full h-auto rounded-md transition-transform duration-300 group-hover:scale-105"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
											<p className="text-white font-semibold text-sm text-center drop-shadow-lg">
												{game.name}
											</p>
										</div>
									</a>
								);
							})}
					</div>
				</div>
			)}
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client="ca-pub-7472145759524820"
				data-ad-slot="8702838637"
				data-ad-format="in-article"
			/>
		</div>
	);
}
