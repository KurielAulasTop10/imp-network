"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState<string>("");

	return (
		<div className="flex">
			<input
				type="text"
				placeholder="Pesquisar"
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				onKeyUp={(e) => {
					if (e.key !== "Enter") return;
					return redirect(`/search?q=${encodeURIComponent(searchTerm)}`);
				}}
				value={searchTerm}
				className={
					"w-full rounded-l-md border-[1px] border-black p-2 text-lg font-normal hover:border-red-600 focus:border-red-600 focus:outline-hidden bg-black focus:bg-zinc-950"
				}
			/>
			<button
				className="bg-red-600 rounded-r-md p-3 cursor-pointer"
				type="submit"
				onClick={() => {
					return redirect(`/search?q=${encodeURIComponent(searchTerm)}`);
				}}
			>
				<BsSearch className="h-full items-center text-xl text-white" />
			</button>
		</div>
	);
}
