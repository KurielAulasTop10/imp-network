"use client";

import type { ChangeEvent } from "react";

import { BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useRecoilState } from "recoil";

import useFocus from "@/hooks/use-focus";
import useHover from "@/hooks/use-hover";
import { queryState } from "@/states/query";

export default function SearchBar() {
	const [query, setQuery] = useRecoilState(queryState);
	const { ref: hoverRef, isHovering } = useHover<HTMLDivElement>();
	const { ref: focusRef, isFocusing } = useFocus<HTMLInputElement>();

	const handleInputClear = () => {
		setQuery("");
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div ref={hoverRef} className="relative mx-auto md:mx-0 w-full">
			<BsSearch className="absolute left-4 flex h-full items-center text-xl text-gray-400" />
			{query && (isHovering || isFocusing) && (
				<IoMdClose
					onClick={handleInputClear}
					className="absolute right-6 flex h-full items-center"
				/>
			)}
			<input
				ref={focusRef}
				type="text"
				placeholder="Pesquisar"
				onChange={handleInputChange}
				value={query}
				className={`w-full rounded-md border-[1px] border-black py-2 px-12 text-lg font-normal hover:border-red-600 focus:border-red-600 focus:outline-none bg-black focus:bg-zinc-950 ${
					isHovering && "border-red-600"
				}`}
			/>
		</div>
	);
}
