"use client";

import { BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
	const [query, setQuery] = useState("");
	const router = useRouter();

	return (
		<div className="relative mx-auto md:mx-0 w-full">
			<BsSearch className="absolute left-4 flex h-full items-center text-xl text-gray-400" />
			{query && (
				<IoMdClose
					onClick={() => setQuery("")}
					className="absolute right-6 flex h-full items-center"
				/>
			)}
			<input
				type="text"
				placeholder="Pesquisar"
				onChange={(e) => {
					setQuery(e.target.value);
					router.push(`/?q=${encodeURIComponent(e.target.value)}`);
				}}
				value={query}
				className={`w-full rounded-md border-[1px] border-black py-2 px-12 text-lg font-normal hover:border-red-600 focus:border-red-600 focus:outline-none bg-black focus:bg-zinc-950 ${
					query && "border-red-600"
				}`}
			/>
		</div>
	);
}