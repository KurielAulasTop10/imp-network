"use client";

import { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PostCard from "@/components/posts/PostCard";
import type { AuthorDocument, PostDocument } from "@/prismicio-types";

interface PostsGridProps {
	posts: PostDocument[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	authorsMap: Map<string, AuthorDocument>;
	isLoading?: boolean;
}

const ELLIPSIS = "…";
const SKELETON_KEYS = Array.from({ length: 21 }, (_, i) => `skeleton-${i}`);

type PagerSlot = { key: string; page: number | null };

function pageList(current: number, total: number): PagerSlot[] {
	const wanted = new Set([1, total, current, current - 1, current + 1]);
	if (total <= 7) for (let p = 1; p <= total; p++) wanted.add(p);
	if (current <= 4) for (const p of [2, 3, 4, 5]) wanted.add(p);
	if (current >= total - 3) for (const p of [1, 2, 3, 4]) wanted.add(total - p);

	const sorted = [...wanted]
		.filter((p) => p >= 1 && p <= total)
		.sort((a, b) => a - b);

	const out: PagerSlot[] = [];
	let previous = 0;
	for (const page of sorted) {
		if (previous && page - previous > 1)
			out.push({ key: `gap-after-${previous}`, page: null });
		out.push({ key: `page-${page}`, page });
		previous = page;
	}
	return out;
}

const stepButton =
	"flex h-11 cursor-pointer items-center gap-1 whitespace-nowrap border border-rule px-3 font-semibold text-[0.72rem] text-ink-2 uppercase tracking-[0.12em] transition-colors duration-200 ease-out hover:border-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none";

export default function PostsGrid({
	posts,
	currentPage,
	totalPages,
	onPageChange,
	authorsMap,
	isLoading,
}: PostsGridProps) {
	const topRef = useRef<HTMLElement>(null);

	const getAuthorData = (post: PostDocument): AuthorDocument | null => {
		const linked = post.data.author as unknown as AuthorDocument | null;
		if (!linked?.uid) return null;
		return authorsMap.get(linked.uid) ?? linked;
	};

	const clampedTotal = totalPages === 0 ? 1 : totalPages;

	const goTo = (page: number) => {
		if (page < 1 || page > clampedTotal || page === currentPage) return;
		onPageChange(page);
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		topRef.current?.scrollIntoView({
			behavior: reduced ? "auto" : "smooth",
			block: "start",
		});
	};

	return (
		<section ref={topRef} className="flex scroll-mt-28 flex-col gap-10">
			{isLoading ? (
				<div className="grid w-full grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
					{SKELETON_KEYS.map((key) => (
						<div
							key={key}
							className="aspect-video w-full animate-pulse border border-rule bg-surface-2 motion-reduce:animate-none"
						>
							<span className="sr-only">Carregando…</span>
						</div>
					))}
				</div>
			) : posts.length >= 1 ? (
				<div className="grid w-full grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
					{posts.map(
						(post) =>
							post && (
								<PostCard
									post={post}
									key={post.uid}
									authorData={getAuthorData(post)}
								/>
							),
					)}
				</div>
			) : (
				<p className="py-16 text-center text-ink-2">
					Nenhuma matéria encontrada.
				</p>
			)}

			{clampedTotal > 1 && (
				<nav
					aria-label="Paginação"
					className="flex flex-wrap items-center justify-center gap-1 border-rule border-t pt-6"
				>
					<button
						type="button"
						onClick={() => goTo(currentPage - 1)}
						disabled={currentPage === 1}
						className={`${stepButton} mr-2`}
					>
						<RiArrowLeftSLine aria-hidden="true" className="size-4" />
						Anterior
					</button>

					<p className="px-3 text-ink-2 text-sm tabular-nums sm:hidden">
						Página <span className="text-ink">{currentPage}</span> de{" "}
						{clampedTotal}
					</p>

					<ol className="hidden items-center gap-1 sm:flex">
						{pageList(currentPage, clampedTotal).map(({ key, page }) =>
							page === null ? (
								<li
									key={key}
									aria-hidden="true"
									className="flex size-11 items-center justify-center text-ink-2"
								>
									{ELLIPSIS}
								</li>
							) : (
								<li key={key}>
									<button
										type="button"
										onClick={() => goTo(page)}
										aria-label={`Ir para a página ${page}`}
										aria-current={page === currentPage ? "page" : undefined}
										className={`flex size-11 cursor-pointer items-center justify-center border text-sm tabular-nums transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft motion-reduce:transition-none ${
											page === currentPage
												? "border-brand-deep bg-brand-deep font-semibold text-ink"
												: "border-rule text-ink-2 hover:border-brand hover:text-ink"
										}`}
									>
										{page}
									</button>
								</li>
							),
						)}
					</ol>

					<button
						type="button"
						onClick={() => goTo(currentPage + 1)}
						disabled={currentPage === clampedTotal}
						className={`${stepButton} ml-2`}
					>
						Próxima
						<RiArrowRightSLine aria-hidden="true" className="size-4" />
					</button>
				</nav>
			)}
		</section>
	);
}
