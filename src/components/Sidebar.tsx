import type { ReactNode } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import SearchBar from "@/components/SearchBar";
import SocialRow from "@/components/SocialRow";
import { cdn } from "@/utils/cdn";

const COVER_COLUMNS: Record<number, string> = {
	1: "grid-cols-1",
	2: "grid-cols-2",
};

interface SidebarProps {
	gamesData?: { data: { id: number; url?: string; name?: string }[] };
	coversData?: { id?: number; url?: string }[];
}

function RailModule({
	title,
	action,
	children,
}: {
	title: string;
	action?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section className="w-full">
			<div className="mb-3 flex items-baseline justify-between gap-3 border-rule border-b pb-2">
				<h2 className="uppercase tracking-[0.14em] text-[0.7rem] text-brand-soft">
					{title}
				</h2>
				{action}
			</div>
			{children}
		</section>
	);
}

export default function Sidebar({ gamesData, coversData }: SidebarProps) {
	const games = gamesData?.data || [];
	const covers = coversData || [];
	const releases = games
		.map((game, index) => ({ game, cover: covers[index] }))
		.filter(({ game, cover }) => Boolean(game.url) && Boolean(cover?.id));

	return (
		<aside className="flex w-full flex-col gap-8 xl:sticky xl:top-28">
			<SearchBar />

			{releases.length > 0 && (
				<RailModule title="Lançamentos de hoje">
					<ul
						className={`grid gap-2 ${COVER_COLUMNS[releases.length] ?? "grid-cols-3"}`}
					>
						{releases.map(({ game, cover }) => (
							<li key={game.id}>
								<a
									target="_blank"
									href={game.url as string}
									rel="noopener noreferrer"
									className="group relative block overflow-hidden border border-rule focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
								>
									<img
										src={cdn(
											`https:${cover?.url?.replace("t_thumb", "t_cover_big")}`,
											264,
											352,
										)}
										alt={game.name as string}
										className="block h-auto w-full"
										loading="lazy"
									/>
									<span className="absolute inset-x-0 bottom-0 bg-scrim p-1.5 text-center text-[0.65rem] text-ink leading-tight opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
										{game.name}
									</span>
								</a>
							</li>
						))}
					</ul>
				</RailModule>
			)}

			<RailModule
				title="Comunidade"
				action={
					<a
						href="https://discord.gg/for-you-856873114926972929"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 whitespace-nowrap text-[0.7rem] text-ink-2 transition-colors duration-200 ease-out hover:text-ink focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
					>
						Entrar
						<RiArrowRightUpLine aria-hidden="true" className="size-3.5" />
					</a>
				}
			>
				<a
					href="https://discord.gg/for-you-856873114926972929"
					target="_blank"
					rel="noopener noreferrer"
					className="block border border-rule transition-colors duration-200 ease-out hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
				>
					<img
						alt="Servidor de Discord da Império Network"
						src="https://discordapp.com/api/guilds/856873114926972929/embed.png?style=banner2&cachebypass=1608373082.412"
						className="block w-full"
						loading="lazy"
					/>
				</a>
			</RailModule>

			<RailModule title="Redes">
				<SocialRow />
			</RailModule>

			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client="ca-pub-7472145759524820"
				data-ad-slot="8702838637"
				data-ad-format="in-article"
			/>
		</aside>
	);
}
