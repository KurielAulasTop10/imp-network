"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState<string>("");

	return (
		<div className="flex max-w-md mx-auto">
			<input
				type="text"
				placeholder="Pesquisar..."
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				onKeyUp={(e) => {
					if (e.key !== "Enter") return;
					return redirect(`/search?q=${encodeURIComponent(searchTerm)}`);
				}}
				value={searchTerm}
				className="w-full rounded-l-2xl border-2 border-gray-700 p-4 text-lg font-medium bg-gray-900 text-white placeholder-gray-400 
			hover:border-gray-600 focus:border-red-500 focus:outline-none focus:bg-gray-800
			transition-all duration-300 shadow-lg"
			/>
			<button
				className="bg-gradient-to-r from-red-600 to-red-500 rounded-r-2xl px-6 cursor-pointer
			hover:from-red-500 hover:to-red-400 active:scale-95
			transition-all duration-300 shadow-lg hover:shadow-xl
			border-2 border-l-0 border-gray-700 hover:border-red-400"
				type="submit"
				onClick={() => {
					return redirect(`/search?q=${encodeURIComponent(searchTerm)}`);
				}}
			>
				<BsSearch className="text-2xl text-white" />
			</button>
		</div>
	);
}
