"use client";

import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();

	return (
		<div className="relative mx-auto md:mx-0 w-full">
			<BsSearch className="absolute left-4 flex h-full items-center text-xl text-gray-400" />
			<input
				type="text"
				placeholder="Pesquisar"
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				onKeyUp={(e) => {
					console.log(e.key);
					if (e.key === "Enter") {
						router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
					}
				}}
				value={searchTerm}
				className={
					"w-full rounded-md border-[1px] border-black py-2 px-12 text-lg font-normal hover:border-red-600 focus:border-red-600 focus:outline-none bg-black focus:bg-zinc-950"
				}
			/>
		</div>
	);
}
