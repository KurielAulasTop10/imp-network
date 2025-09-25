"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsNintendoSwitch } from "react-icons/bs";
import {
	RiAppStoreFill,
	RiArrowDropDownLine,
	RiComputerLine,
	RiCpuLine,
	RiGameFill,
	RiGamepadFill,
	RiGuideFill,
	RiMenuFill,
	RiNewspaperFill,
	RiPlaystationFill,
	RiProjector2Fill,
	RiStarSmileFill,
	RiTimerFlashFill,
	RiTvFill,
	RiXboxFill,
} from "react-icons/ri";

export default function Header() {
	const pathname = usePathname();

	if (pathname?.endsWith("classic"))
		return (
			<Link href="/" className="text-red-500 hover:text-red-600 p-3">
				Voltar ao Início
			</Link>
		);

	return (
		<nav className="w-full relative">
			{/* Header simplificado com gradiente escuro */}
			<div className="bg-gradient-to-b from-gray-950 to-gray-900 w-full h-48 rounded-b-3xl shadow-2xl border-b border-gray-800 relative overflow-hidden">
				{/* Efeito sutil de brilho no centro */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-50" />

				{/* Logo centralizado */}
				<Link
					href="/"
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<img
						src="/logo.png"
						alt="Império Network Logo"
						className="h-36 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 filter brightness-110"
					/>
				</Link>
			</div>

			{/* Menu Button */}
			<div className="absolute top-6 left-6 z-20">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger className="p-3 bg-gray-900 hover:bg-gray-800 rounded-2xl cursor-pointer border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm">
						<RiMenuFill
							size={24}
							className="text-white group-hover:text-red-400 transition-colors"
						/>
					</DropdownMenu.Trigger>

					<DropdownMenu.Portal>
						<DropdownMenu.Content className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-3 min-w-[200px] backdrop-blur-lg">
							{/* Itens do menu (mantive o mesmo conteúdo que já tinhas) */}
							<Link href={"/categoria/anime"}>
								<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-800 text-white transition-all duration-200 group">
									<RiTvFill className="text-red-400 group-hover:scale-110 transition-transform" />
									<span className="font-medium">Animes</span>
								</DropdownMenu.Item>
							</Link>

							{/* Categoria Cinema */}
							<Link href={"/categoria/cinema"}>
								<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-800 text-white transition-all duration-200 group">
									<RiProjector2Fill className="text-red-400 group-hover:scale-110 transition-transform" />
									<span className="font-medium">Cinema</span>
								</DropdownMenu.Item>
							</Link>

							{/* Submenu Games */}
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-gray-800 text-white transition-all duration-200 group">
									<div className="flex items-center gap-3">
										<RiGameFill className="text-red-400 group-hover:scale-110 transition-transform" />
										<span className="font-medium">Games</span>
									</div>
									<RiArrowDropDownLine
										size={20}
										className="group-hover:text-red-400 transition-colors"
									/>
								</DropdownMenu.SubTrigger>

								<DropdownMenu.Portal>
									<DropdownMenu.SubContent className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-3 ml-2 backdrop-blur-lg">
										<Link href={"/categoria/grátis"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiTimerFlashFill className="text-yellow-400 text-sm" />
												<span>Grátis</span>
											</DropdownMenu.Item>
										</Link>
										<Link href={"/categoria/notícia"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiNewspaperFill className="text-blue-400 text-sm" />
												<span>Notícias</span>
											</DropdownMenu.Item>
										</Link>
										<Link href={"/categoria/guia"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiGuideFill className="text-green-400 text-sm" />
												<span>Guias</span>
											</DropdownMenu.Item>
										</Link>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>

							{/* Submenu Plataformas */}
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-gray-800 text-white transition-all duration-200 group">
									<div className="flex items-center gap-3">
										<RiGamepadFill className="text-red-400 group-hover:scale-110 transition-transform" />
										<span className="font-medium">Plataformas</span>
									</div>
									<RiArrowDropDownLine
										size={20}
										className="group-hover:text-red-400 transition-colors"
									/>
								</DropdownMenu.SubTrigger>

								<DropdownMenu.Portal>
									<DropdownMenu.SubContent className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-3 ml-2 backdrop-blur-lg">
										{/* ... plataformas com ícones coloridos ... */}
										<Link href={"/categoria/nintendo"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<BsNintendoSwitch className="text-red-500 text-sm" />
												<span>Nintendo</span>
											</DropdownMenu.Item>
										</Link>
										<Link href={"/categoria/pc"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiComputerLine className="text-blue-400 text-sm" />
												<span>PC</span>
											</DropdownMenu.Item>
										</Link>
										<Link href={"/categoria/playstation"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiPlaystationFill className="text-blue-600 text-sm" />{" "}
												PlayStation
											</DropdownMenu.Item>
										</Link>
										<Link href={"/categoria/xbox"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiXboxFill className="text-green-500 text-sm" /> Xbox
											</DropdownMenu.Item>
										</Link>
										<Link href={"/categoria/mobile"}>
											<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-gray-800 text-white transition-all duration-200 group">
												<RiAppStoreFill className="text-white text-sm" /> Mobile
											</DropdownMenu.Item>
										</Link>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>

							{/* Categoria Reviews */}
							<Link href={"/categoria/review"}>
								<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-800 text-white transition-all duration-200 group">
									<RiStarSmileFill className="text-yellow-400 group-hover:scale-110 transition-transform" />
									<span className="font-medium">Reviews</span>
								</DropdownMenu.Item>
							</Link>

							{/* Categoria Tech */}
							<Link href={"/categoria/tech"}>
								<DropdownMenu.Item className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-800 text-white transition-all duration-200 group">
									<RiCpuLine className="text-purple-400 group-hover:scale-110 transition-transform" />
									<span className="font-medium">Tech</span>
								</DropdownMenu.Item>
							</Link>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
		</nav>
	);
}
