import { RiSearchLine } from "react-icons/ri";

export default function SearchBar() {
	return (
		<form
			action="/search"
			method="get"
			role="search"
			className="flex w-full items-stretch border border-rule bg-surface-2 transition-colors duration-200 ease-out focus-within:border-brand motion-reduce:transition-none"
		>
			<span className="flex items-center pl-3 text-ink-2">
				<RiSearchLine aria-hidden="true" className="size-4" />
			</span>
			<input
				type="search"
				name="q"
				placeholder="Pesquisar no site"
				aria-label="Pesquisar no site"
				className="h-11 min-w-0 flex-1 bg-transparent px-3 text-ink text-sm placeholder:text-ink-2 focus:outline-none"
			/>
			<button
				type="submit"
				className="h-11 shrink-0 cursor-pointer whitespace-nowrap bg-brand-deep px-4 font-semibold text-[0.72rem] text-ink uppercase tracking-[0.12em] transition-colors duration-200 ease-out hover:bg-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
			>
				Buscar
			</button>
		</form>
	);
}
