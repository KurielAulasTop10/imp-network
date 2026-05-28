import {
	fields,
	igdb,
	limit,
	twitchAccessToken,
	where,
	whereIn,
} from "ts-igdb-client";

interface GameData {
	data: { id: number; url?: string; name?: string }[];
}

const MAX_RETRIES = 3;

async function fetchWithRetry<T>(fn: () => Promise<T>, attempt = 0): Promise<T> {
	try {
		return await fn();
	} catch (error: any) {
		if (error?.response?.status === 429 && attempt < MAX_RETRIES) {
			await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
			return fetchWithRetry(fn, attempt + 1);
		}
		throw error;
	}
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

		const todayTimestamp =
			new Date(new Date().toISOString().split("T")[0]).getTime() / 1000;

		const gamesData = (await fetchWithRetry(() =>
			client
				.request("games")
				.pipe(
					fields(["id", "url", "name"]),
					where("category", "=", 0),
					where("first_release_date", "=", todayTimestamp),
				)
				.execute(),
		)) as unknown as GameData;

		const gameIds = gamesData.data.map((game) => game.id).filter(Boolean) as number[];

		if (gameIds.length === 0) {
			return { gamesData, coversData: [] };
		}

		const coversResponse = (await fetchWithRetry(() =>
			client
				.request("covers")
				.pipe(
					fields(["url", "game"]),
					whereIn("game", gameIds),
					limit(Math.min(gameIds.length + 10, 500)),
				)
				.execute(),
		)) as unknown as { data: { game?: number; url?: string }[] };

		const coversMap = new Map(
			coversResponse.data.map((c) => [c.game, c]),
		);
		const coversData: { id?: number; url?: string }[] = gameIds
			.map((id) => {
				const c = coversMap.get(id);
				return c ? { id, url: c.url } : null;
			})
			.filter((c) => c !== null);

		return { gamesData, coversData };
	} catch {
		return { gamesData: null, coversData: null };
	}
}
