// import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/prismicio";
// import { BsTrophyFill } from "react-icons/bs";
import HomePageContent from "./_components/HomePageContent";
import Sidebar from "./_components/Sidebar";

export default async function BlogPage() {
	const clientPrismic = createClient({ fetchOptions: { cache: "no-cache" } });
	const allPosts = await clientPrismic.getAllByType("post", {
		orderings: {
			field: "my.post.data",
			direction: "desc",
		},
	});

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 w-full items-start mt-5 md:mt-10 px-2 md:px-5 gap-10">
			<div className="w-full col-span-4">
				{/* <Link
						href="/goty"
						className="flex flex-row w-full bg-black text-white rounded-md mb-5 gap-3 items-center"
					>
						<BsTrophyFill className="text-white p-3 bg-zinc-950 w-12 h-full rounded-l-md" />
						<p>
							A TGA já abriu as votações! Vote no seu jogo favorito do ano e em muitos outros. 
						</p>
					</Link>  */}
				{/*<Link
					href="/gamescom"
					className="flex flex-row w-full bg-black text-white rounded-md mb-5 gap-3 items-center"
				>
					<BsTrophyFill className="text-white p-3 bg-zinc-950 w-12 h-full rounded-l-md" />
					<p>
						A maior feira de jogos alemã Gamescom está prestes a começar, saiba todo o
						calendário aqui.
					</p>
				</Link>*/}
				<Suspense fallback={<p>Carregando... Aguarde alguns segundos.</p>}>
					<HomePageContent allPosts={allPosts} />
				</Suspense>
			</div>
			<Sidebar />
		</div>
	);
}
