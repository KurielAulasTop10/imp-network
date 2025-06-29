import { Suspense } from "react";
import Search from "./_components/Search";

export default function SearchPage() {
	return (
		<Suspense
			fallback={
				<p className="text-center py-[25vh]">
					Carregando... Aguarde alguns segundos.
				</p>
			}
		>
			<Search />
		</Suspense>
	);
}
