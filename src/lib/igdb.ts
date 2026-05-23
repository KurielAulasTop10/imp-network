import { fields, igdb, twitchAccessToken, where } from "ts-igdb-client";

interface GameData {
	data: { id: number; url?: string; name?: string }[];
}

export async function fetchTodayGames(): Promise<{
	gamesData: GameData | null;
	coversData: { id?: number; url?: string }[] | null;
}> {
	const clientId = import.meta.env.IGDB_ID;
	const clientSecret = import.meta.env.IGDB_SECRET;

	if (!clientId || !clientSecret) {
		return { gamesData: null, coversData: null };
	}

	try {
		const accessToken = await twitchAccessToken({
			client_id: clientId,
			client_secret: clientSecret,
		});

		const client = igdb(clientId, accessToken);

		let failedAttempts = 0;

		async function fetchGamesWithBackoff(): Promise<GameData> {
			try {
				return await client
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
			} catch (error: any) {
				if (error?.response?.status === 429) {
					const waitTime = 2 ** failedAttempts * 1000;
					await new Promise((resolve) => setTimeout(resolve, waitTime));
					failedAttempts++;
					return fetchGamesWithBackoff();
				}
				throw error;
			}
		}

		const gamesData = await fetchGamesWithBackoff();

		const gameIds = gamesData.data.map((game: any) => game.id);

		async function fetchCoversWithBackoff(ids: number[]) {
			let attempts = 0;
			try {
				return await Promise.all(
					ids.map(async (id) => {
						const coverResponse = await client
							.request("covers")
							.pipe(fields(["url"]), where("game", "=", id))
							.execute();
						return coverResponse.data[0];
					}),
				);
			} catch (error: any) {
				if (error?.response?.status === 429) {
					const waitTime = 2 ** attempts * 1000;
					await new Promise((resolve) => setTimeout(resolve, waitTime));
					attempts++;
					return fetchCoversWithBackoff(ids);
				}
				throw error;
			}
		}

		const coversData = (await fetchCoversWithBackoff(gameIds)).filter(Boolean);

		return { gamesData, coversData };
	} catch {
		return { gamesData: null, coversData: null };
	}
}
