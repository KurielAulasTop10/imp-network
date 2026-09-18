"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId, useRef, useState } from "react";
import {
	RiArrowDownSLine,
	RiCloseLine,
	RiMenuFill,
	RiRssFill,
	RiSearchLine,
} from "react-icons/ri";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const SECTIONS: NavItem[] = [
	{
		label: "Games",
		children: [
			{ label: "Notícias", href: "/categoria/notícia" },
			{ label: "Guias", href: "/categoria/guia" },
			{ label: "Grátis", href: "/categoria/grátis" },
		],
	},
	{
		label: "Plataformas",
		children: [
			{ label: "PlayStation", href: "/categoria/playstation" },
			{ label: "Xbox", href: "/categoria/xbox" },
			{ label: "Nintendo", href: "/categoria/nintendo" },
			{ label: "PC", href: "/categoria/pc" },
			{ label: "Mobile", href: "/categoria/mobile" },
		],
	},
	{ label: "Reviews", href: "/categoria/review" },
	{ label: "Animes", href: "/categoria/anime" },
	{ label: "Cinema", href: "/categoria/cinema" },
	{ label: "Tech", href: "/categoria/tech" },
];

const INSTITUTIONAL: NavChild[] = [
	{ label: "Sobre", href: "/sobre" },
	{ label: "Contato", href: "/contato" },
];

const linkBase =
	"whitespace-nowrap uppercase tracking-[0.12em] text-[0.72rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [pathname, setPathname] = useState("");
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const sheetTitleId = useId();

	useEffect(() => {
		setPathname(decodeURIComponent(window.location.pathname));
	}, []);

	useEffect(() => {
		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				setScrolled(window.scrollY > 24);
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	const openNow = (label: string) => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		setOpenMenu(label);
	};
	const closeSoon = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
	};

	const isActive = (href?: string) => Boolean(href) && pathname === href;
	const groupActive = (item: NavItem) =>
		isActive(item.href) ||
		Boolean(item.children?.some((c) => isActive(c.href)));

	return (
		<header className="sticky top-0 z-50 w-full bg-surface">
			<div className="mx-auto flex h-16 w-full max-w-350 items-center gap-3 px-4 md:px-6 lg:h-20">
				<a
					href="/"
					aria-label="Império Network — página inicial"
					className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
				>
					<img
						src="/logo.png"
						alt="Império Network"
						width={1026}
						height={443}
						fetchPriority="high"
						className={`h-11 w-auto origin-left object-contain transition-transform duration-300 ease-out motion-reduce:transition-none lg:h-14 ${
							scrolled ? "scale-80" : "scale-100"
						}`}
					/>
				</a>

				<nav
					aria-label="Seções"
					className="ml-auto hidden items-center gap-1 lg:flex"
				>
					{SECTIONS.map((item) => {
						const active = groupActive(item);
						if (!item.children) {
							return (
								<a
									key={item.label}
									href={item.href}
									aria-current={active ? "page" : undefined}
									className={`${linkBase} relative px-3 py-2 transition-colors duration-200 ease-out motion-reduce:transition-none ${
										active
											? "text-ink"
											: "text-ink-2 hover:text-ink focus-visible:text-ink"
									}`}
								>
									{item.label}
									<span
										aria-hidden="true"
										className={`absolute inset-x-3 -bottom-px h-0.5 bg-brand transition-opacity duration-200 ease-out motion-reduce:transition-none ${
											active ? "opacity-100" : "opacity-0"
										}`}
									/>
								</a>
							);
						}
						const isOpen = openMenu === item.label;
						return (
							// biome-ignore lint/a11y/noStaticElementInteractions: hover/blur affordances only — the button and links inside carry the real semantics and keyboard path
							<div
								key={item.label}
								className="relative"
								onPointerEnter={() => openNow(item.label)}
								onPointerLeave={closeSoon}
								onFocus={() => openNow(item.label)}
								onBlur={(e) => {
									if (!e.currentTarget.contains(e.relatedTarget as Node))
										closeSoon();
								}}
								onKeyDown={(e) => {
									if (e.key === "Escape") setOpenMenu(null);
								}}
							>
								<button
									type="button"
									aria-expanded={isOpen}
									aria-haspopup="true"
									onClick={() => setOpenMenu(isOpen ? null : item.label)}
									className={`${linkBase} relative flex cursor-pointer items-center gap-1 px-3 py-2 transition-colors duration-200 ease-out motion-reduce:transition-none ${
										active || isOpen
											? "text-ink"
											: "text-ink-2 hover:text-ink focus-visible:text-ink"
									}`}
								>
									{item.label}
									<RiArrowDownSLine
										aria-hidden="true"
										className={`size-4 transition-transform duration-200 ease-out motion-reduce:transition-none ${
											isOpen ? "rotate-180" : "rotate-0"
										}`}
									/>
									<span
										aria-hidden="true"
										className={`absolute inset-x-3 -bottom-px h-0.5 bg-brand transition-opacity duration-200 ease-out motion-reduce:transition-none ${
											active ? "opacity-100" : "opacity-0"
										}`}
									/>
								</button>
								<div
									className={`absolute top-full left-0 min-w-52 border border-rule bg-surface-2 py-1 shadow-panel transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
										isOpen
											? "visible translate-y-0 opacity-100"
											: "invisible -translate-y-1 opacity-0"
									}`}
								>
									{item.children.map((child) => (
										<a
											key={child.href}
											href={child.href}
											aria-current={isActive(child.href) ? "page" : undefined}
											className={`block border-brand border-l-2 px-4 py-2.5 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none ${
												isActive(child.href)
													? "bg-surface text-ink"
													: "border-transparent text-ink-2 hover:border-brand hover:bg-surface hover:text-ink"
											}`}
										>
											{child.label}
										</a>
									))}
								</div>
							</div>
						);
					})}
				</nav>

				<form
					action="/search"
					method="get"
					role="search"
					className="ml-auto hidden items-center gap-2 border border-rule bg-surface-2 px-3 focus-within:border-brand lg:ml-6 lg:flex"
				>
					<RiSearchLine aria-hidden="true" className="size-4 text-ink-2" />
					<input
						type="search"
						name="q"
						placeholder="Pesquisar"
						aria-label="Pesquisar no site"
						className="h-10 w-40 bg-transparent text-ink text-sm placeholder:text-ink-2 focus:outline-none"
					/>
				</form>

				<a
					href="/search"
					aria-label="Pesquisar"
					className="ml-auto flex size-11 items-center justify-center border border-rule text-ink-2 transition-colors duration-200 ease-out hover:border-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none lg:hidden"
				>
					<RiSearchLine aria-hidden="true" className="size-5" />
				</a>

				<Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
					<Dialog.Trigger asChild>
						<button
							type="button"
							aria-label="Abrir menu de seções"
							className="flex size-11 cursor-pointer items-center justify-center border border-rule text-ink transition-colors duration-200 ease-out hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none lg:hidden"
						>
							<RiMenuFill aria-hidden="true" className="size-5" />
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="fixed inset-0 z-50 bg-scrim data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in motion-reduce:animate-none" />
						<Dialog.Content
							aria-labelledby={sheetTitleId}
							className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,90vw)] flex-col border-rule border-l bg-surface data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right motion-reduce:animate-none"
						>
							<div className="flex items-center justify-between border-rule border-b px-4 py-3">
								<Dialog.Title
									id={sheetTitleId}
									className="uppercase tracking-[0.14em] text-[0.72rem] text-ink-2"
								>
									Seções
								</Dialog.Title>
								<Dialog.Close asChild>
									<button
										type="button"
										aria-label="Fechar menu"
										className="flex size-11 cursor-pointer items-center justify-center text-ink-2 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
									>
										<RiCloseLine aria-hidden="true" className="size-6" />
									</button>
								</Dialog.Close>
							</div>

							<nav
								aria-label="Seções"
								className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
							>
								{SECTIONS.map((item) =>
									item.children ? (
										<div key={item.label} className="mb-5">
											<p className="mb-1 border-rule border-b pb-1 uppercase tracking-[0.14em] text-[0.7rem] text-brand-soft">
												{item.label}
											</p>
											{item.children.map((child) => (
												<a
													key={child.href}
													href={child.href}
													className="flex min-h-11 items-center whitespace-nowrap text-ink-2 transition-colors duration-200 ease-out hover:text-ink focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
												>
													{child.label}
												</a>
											))}
										</div>
									) : (
										<a
											key={item.label}
											href={item.href}
											className={`flex min-h-11 items-center whitespace-nowrap border-rule border-b uppercase tracking-[0.12em] text-[0.78rem] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none ${
												isActive(item.href)
													? "text-brand-soft"
													: "text-ink hover:text-brand-soft"
											}`}
										>
											{item.label}
										</a>
									),
								)}
							</nav>

							<div className="flex flex-wrap items-center gap-x-5 border-rule border-t px-4 py-3">
								{INSTITUTIONAL.map(({ label, href }) => (
									<a
										key={href}
										href={href}
										className="flex min-h-11 items-center whitespace-nowrap text-[0.75rem] text-ink-2 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
									>
										{label}
									</a>
								))}
								<a
									href="/rss.xml"
									className="flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[0.75rem] text-ink-2 transition-colors duration-200 ease-out hover:text-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none"
								>
									<RiRssFill aria-hidden="true" className="size-3.5" />
									RSS
								</a>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</div>

			<div aria-hidden="true" className="h-0.5 w-full bg-brand" />
		</header>
	);
}
