import PostsGrid from "@/components/posts/PostsGrid";
import { createClient } from "@/prismicio";
import Sidebar from "./_components/Sidebar";
import { Suspense } from "react";
import Link from "next/link";
import { BsCalendarEventFill } from "react-icons/bs";

export default async function BlogPage() {
	const clientPrismic = createClient({
		accessToken:
			"MC5abnctRUJBQUFDSUFjNTB0.77-9D--_ve-_vTXvv70iGO-_vXvvv70VT--_ve-_vSrvv73vv71hDu-_ve-_ve-_ve-_vWom77-9HDvvv71dGg",
		fetchOptions: {
			cache: "no-store",
		},
	});
	const allPosts = await clientPrismic.getAllByType("post", {
		orderings: {
			field: "my.post.data",
			direction: "desc",
		},
	});

	return (
		<>
			<div className="flex flex-col xl:flex-row justify-between items-start md:items-center xl:items-start mt-5 md:mt-10 mx-auto px-2 md:px-5 w-full gap-10">
				<div className="w-full">
					{/* <Link
						href="/gamescom"
						className="flex flex-row w-full bg-red-600 text-red-300 rounded-md mb-5 gap-3 items-center"
					>
						<BsCalendarEventFill className="text-white p-3 bg-red-700 w-12 h-full rounded-l-md" />
						<p>
							A Gamescom chegou, e nós atualizámos nosso site com uma página do
							evento com o calendário. Clique aqui para saber mais.
						</p>
					</Link> */}
					<Suspense fallback={<p>Carregando... Aguarde alguns segundos.</p>}>
						<PostsGrid allPosts={allPosts} />
					</Suspense>
				</div>
				<Sidebar />
			</div>
		</>
	);
}
