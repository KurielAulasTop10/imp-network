/** biome-ignore-all lint/performance/noImgElement: false */
import type { AxiosError } from "axios";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
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
import { fields, igdb, twitchAccessToken, where } from "ts-igdb-client";
import SearchBar from "@/components/SearchBar";
import { cdn } from "@/utils/cdn";

export default async function Sidebar() {
	const accessToken = await twitchAccessToken({
		client_id: process.env.IGDB_ID as string,
		client_secret: process.env.IGDB_SECRET as string,
	});

	const client = igdb(process.env.IGDB_ID as string, accessToken);

	let failedAttempts = 0;

	async function fetchGamesDataWithBackoff() {
		try {
			const gamesData = await client
				.request("games")
				.pipe(
					fields(["id", "url", "name"]),
					where("category", "=", 0),
					where(
						"first_release_date",
						"=",
						new Date(new Date().toISOString().split("T")[0]).getTime() / 1000,
					),
				)
				.execute();

			return gamesData;
		} catch (error) {
			if (
				(error as AxiosError).response &&
				(error as AxiosError).response?.status === 429
			) {
				const waitTime = 2 ** failedAttempts * 1000;
				await new Promise((resolve) => setTimeout(resolve, waitTime));
				failedAttempts++;
				return fetchGamesDataWithBackoff();
			}
			throw error;
		}
	}

	const gamesData = await fetchGamesDataWithBackoff();

	async function fetchCoverDataWithBackoff(gameIds: number[]) {
		try {
			const responses = await Promise.all(
				gameIds.map(async (id) => {
					const coverResponse = await client
						.request("covers")
						.pipe(fields(["url"]), where("game", "=", id))
						.execute();

					return coverResponse.data[0];
				}),
			);

			return responses;
		} catch (error) {
			if (
				(error as AxiosError).response &&
				(error as AxiosError).response?.status === 429
			) {
				const waitTime = 2 ** failedAttempts * 1000;
				await new Promise((resolve) => setTimeout(resolve, waitTime));
				failedAttempts++;
				return fetchCoverDataWithBackoff(gameIds);
			}
			throw error;
		}
	}

	const gameIds = gamesData.data.map((game) => game.id);
	const coversData = await fetchCoverDataWithBackoff(gameIds as number[]);

	return (
		<div className="w-full flex gap-4 flex-col xl:sticky xl:top-10">
			<SearchBar />

			{/* Discord Section */}
			<div className="w-full">
				<h3 className="w-full p-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-md text-center mb-3">
					Entre no nosso Discord
				</h3>
				<Link
					href="https://discord.gg/for-you-856873114926972929"
					target="_blank"
				>
					<img
						alt="Discord Server"
						src="https://discordapp.com/api/guilds/856873114926972929/embed.png?style=banner2&cachebypass=1608373082.412"
						className="w-full rounded-md hover:opacity-90 transition-opacity duration-200"
					/>
				</Link>
			</div>

			{/* Social Media Section */}
			<div className="w-full">
				<h3 className="w-full p-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-md text-center mb-3">
					Siga-nos nas Redes Sociais
				</h3>
				<div className="grid grid-cols-3 gap-2">
					{[
						{
							href: "https://www.threads.net/@imperionetwork6",
							icon: BsThreads,
							color: "bg-gray-800 hover:bg-gray-700",
						},
						{
							href: "https://www.instagram.com/imperionetwork6",
							icon: BsInstagram,
							color:
								"bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] hover:from-[#ff4d94] hover:to-[#7a3aff]",
						},
						{
							href: "https://whatsapp.com/channel/0029VagzzeBBqbr3DWorwm1i",
							icon: BsWhatsapp,
							color: "bg-green-600 hover:bg-green-500",
						},
						{
							href: "https://bsky.app/profile/imperionetwork.fr",
							icon: RiBlueskyFill,
							color: "bg-blue-600 hover:bg-blue-500",
						},
						{
							href: "https://x.com/imperionetwork6",
							icon: BsTwitterX,
							color: "bg-black hover:bg-gray-800",
						},
						{
							href: "https://www.facebook.com/profile.php?id=61560538208689",
							icon: BsFacebook,
							color: "bg-blue-700 hover:bg-blue-600",
						},
						{
							href: "https://steamcommunity.com/groups/imperionetwork",
							icon: BsSteam,
							color: "bg-gray-900 hover:bg-gray-800",
						},
						{
							href: "https://www.youtube.com/@imperionetwork",
							icon: BsYoutube,
							color: "bg-[#FF0000] hover:bg-red-600",
						},
						{
							href: "https://www.twitch.tv/imp3rionetwork",
							icon: BsTwitch,
							color:
								"bg-gradient-to-r from-[#772CE8] to-[#9146FF] hover:from-[#8a3aff] hover:to-[#a45cff]",
						},
					].map(({ href, icon: Icon, color }) => (
						<Link
							key={href}
							href={href}
							className={`w-full p-2 flex items-center justify-center text-white text-lg rounded-md transition-colors duration-200 ${color}`}
							target="_blank"
						>
							<Icon />
						</Link>
					))}
				</div>
			</div>

			{/* Games Section */}
			<div className="w-full">
				<h3 className="w-full p-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-md text-center mb-3">
					Que Jogos Lançam Hoje?
				</h3>
				<div
					className={`grid ${gamesData.data.length <= 2 ? `grid-cols-${gamesData.data.length}` : "grid-cols-3"} gap-3 w-full`}
				>
					{gamesData.data
						.filter((game, index) => game.url && coversData[index]?.id)
						.map((game) => {
							const coverIndex = gamesData.data.findIndex(
								(g) => g.id === game.id,
							);
							return (
								<Link
									target="_blank"
									href={game.url as Url}
									key={game.id}
									className="group block relative overflow-hidden rounded-md"
								>
									<img
										src={cdn(
											`https:${coversData[coverIndex]?.url?.replace("t_thumb", "t_cover_big")}`,
											264,
											352,
										)}
										alt={game.name as string}
										className="w-full h-auto rounded-md transition-transform duration-300 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									<div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
										<p className="text-white font-semibold text-sm text-center drop-shadow-lg">
											{game.name}
										</p>
									</div>
								</Link>
							);
						})}
				</div>
			</div>
		</div>
	);
}
