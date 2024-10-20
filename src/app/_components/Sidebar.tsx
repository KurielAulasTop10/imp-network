import SearchBar from "@/components/SearchBar";
import { cdn } from "@/utils/cdn";
import type { AxiosError } from "axios";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import {
	BsInstagram,
	BsThreads,
	BsTwitch,
	BsWhatsapp,
	BsYoutube,
} from "react-icons/bs";
import { RiBlueskyFill } from "react-icons/ri";
import { fields, igdb, twitchAccessToken, where } from "ts-igdb-client";

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
		<div className="w-full xl:w-1/4 flex gap-4 flex-col xl:sticky xl:top-10">
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
			<h3 className="w-full p-2 uppercase bg-black text-white font-normal rounded-md">
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
					className="w-full flex bg-gradient-to-r hover:text-black from-[#ee2a7b] to-[#6228d7] p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
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
					href="https://bsky.app/profile/imperionetwork.me"
					className="w-full flex bg-blue-600 hover:text-black p-2 items-center justify-center font-semibold text-lg gap-2 rounded-md"
					target="_blank"
				>
					<RiBlueskyFill />
				</Link>
			</div>
			<h3 className="w-full p-2 uppercase bg-black text-white font-normal rounded-md">
				QUE JOGOS LANÇAM HOJE?
			</h3>
			<div
				className={`grid ${gamesData.data.length <= 3 ? `grid-cols-${gamesData.data.length}` : "grid-cols-3"} gap-3`}
			>
				{gamesData.data.map((game, index) => (
					<Link
						target="_blank"
						href={game.url as Url}
						key={game.id}
						className="rounded-md w-full h-full hover:opacity-80"
					>
						<img
							src={cdn(
								coversData[index]?.url === undefined
									? `https://ui-avatars.com/api/?name=${game.name?.replaceAll(" ", "+")}&length=5&format=png&size=512&background=000000&color=FFF`
									: `https:${coversData[index]?.url?.replace("t_thumb", "t_cover_big")}`, 264, 352
							)}
							alt={game.name as string}
							className="h-full rounded-md"
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
