import Link from "next/link";
import { Suspense } from "react";
import { BsTrophyFill } from "react-icons/bs";
import PostsGrid from "@/components/posts/PostsGrid";
import { createClient } from "@/prismicio";
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
		<div className="flex flex-col xl:flex-row justify-between items-start md:items-center xl:items-start mt-5 md:mt-10 mx-auto px-2 md:px-5 w-full gap-10">
			<div className="w-full">
				{/* <Link
						href="/goty"
						className="flex flex-row w-full bg-black text-white rounded-md mb-5 gap-3 items-center"
					>
						<BsTrophyFill className="text-white p-3 bg-zinc-950 w-12 h-full rounded-l-md" />
						<p>
							A TGA já abriu as votações! Vote no seu jogo favorito do ano e em muitos outros. 
						</p>
					</Link>  */}
				<Link
					href="/gamescom"
					className="flex flex-row w-full bg-black text-white rounded-md mb-5 gap-3 items-center"
				>
					<BsTrophyFill className="text-white p-3 bg-zinc-950 w-12 h-full rounded-l-md" />
					<p>
						A maior feira de jogos alemã Gamescom está prestes a começar, saiba todo o
						calendário aqui.
					</p>
				</Link>
				<Suspense fallback={<p>Carregando... Aguarde alguns segundos.</p>}>
					<PostsGrid allPosts={allPosts} />
				</Suspense>
			</div>
			<Sidebar />
		</div>
	);
}
