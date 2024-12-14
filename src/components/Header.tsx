"use client";

import Link from "next/link";
import {
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
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsNintendoSwitch } from "react-icons/bs";
import { usePathname } from "next/navigation";

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
			<div className="blur-sm bg-[url(https://i.ibb.co/XSMYhNc/XTAAuLY.webp)] bg-cover bg-center w-full h-60 z-10" />
			<Link href="/">
				<img
					src="/logo.png"
					alt="Império Network Logo"
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-52 p-3 object-contain"
				/>
			</Link>
			<div className="w-full flex items-center px-5 rounded-b-md">
				<div className="w-full text-white font-normal uppercase flex gap-2.5 items-center justify-start text-sm">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger className="absolute top-5 left-5 hover:text-red-600">
							<RiMenuFill size={28} />
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content className="bg-black rounded-md text-white mt-1.5 font-normal text-md p-2">
								<Link href={"/categoria/anime"}>
									<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
										<RiTvFill /> Animes
									</DropdownMenu.Item>
								</Link>
								<Link href={"/categoria/cinema"}>
									<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
										<RiProjector2Fill /> Cinema
									</DropdownMenu.Item>
								</Link>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
										<div className="flex items-center gap-1">
											<RiGameFill />
											Games
											<RiArrowDropDownLine size={28} />
										</div>
									</DropdownMenu.SubTrigger>

									<DropdownMenu.Portal>
										<DropdownMenu.SubContent className="bg-black rounded-md text-white ml-2 font-normal text-md p-2">
											<Link href={"/categoria/grátis"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<RiTimerFlashFill />
													Grátis
												</DropdownMenu.Item>
											</Link>
											<Link href={"/categoria/notícia"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<RiNewspaperFill /> Notícias
												</DropdownMenu.Item>
											</Link>
											<Link href={"/categoria/guia"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<RiGuideFill /> Guias
												</DropdownMenu.Item>
											</Link>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Sub>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
										<div className="flex items-center gap-1">
											<RiGamepadFill />
											Plataformas
											<RiArrowDropDownLine size={28} />
										</div>
									</DropdownMenu.SubTrigger>

									<DropdownMenu.Portal>
										<DropdownMenu.SubContent className="bg-black rounded-md text-white ml-2 font-normal text-md p-2">
											<Link href={"/categoria/nintendo"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<BsNintendoSwitch />
													Nintendo
												</DropdownMenu.Item>
											</Link>
											<Link href={"/categoria/pc"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<RiComputerLine /> PC
												</DropdownMenu.Item>
											</Link>
											<Link href={"/categoria/playstation"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<RiPlaystationFill /> PlayStation
												</DropdownMenu.Item>
											</Link>
											<Link href={"/categoria/xbox"}>
												<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
													<RiXboxFill /> Xbox
												</DropdownMenu.Item>
											</Link>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Sub>
								<Link href={"/categoria/review"}>
									<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
										<RiStarSmileFill /> Reviews
									</DropdownMenu.Item>
								</Link>
								<Link href={"/categoria/tech"}>
									<DropdownMenu.Item className="flex items-center gap-1 rounded-md outline-none px-3 py-1 hover:bg-red-900">
										<RiCpuLine /> Tech
									</DropdownMenu.Item>
								</Link>
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</div>
			</div>
		</nav>
	);
}
