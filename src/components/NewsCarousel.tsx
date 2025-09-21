"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cdn } from "@/utils/cdn";
import type { PostDocument } from "../../prismicio-types";

interface NewsCarouselProps {
	posts: PostDocument[];
}

export default function NewsCarousel({ posts }: NewsCarouselProps) {
	// Take only the first 5 posts for the carousel
	const carouselPosts = posts.slice(0, 4);

	if (carouselPosts.length === 0) {
		return null;
	}

	return (
		<div className="w-full mb-8">
			<div className="relative">
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					plugins={[
						Autoplay({
							delay: 5000,
						}),
					]}
					className="w-full"
				>
					<CarouselContent>
						{carouselPosts.map((post, index) => (
							<CarouselItem key={post.uid || index}>
								<Link href={`/post/${post.uid}`}>
									<div
										className="relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-cover bg-no-repeat bg-center"
										style={{
											backgroundImage: `url(${cdn(post.data.cover.url as string, 0, 0)})`,
										}}
									>
										{/* Background overlay */}
										<div className="absolute inset-0 bg-black/60"></div>

										{/* Content */}
										<div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8 text-white">
											<div className="max-w-4xl">
												<span className="inline-block px-3 py-1 mb-4 text-sm font-semibold bg-red-500 text-white rounded-full">
													DESTAQUE
												</span>
												<h1 className="mb-4 text-lg md:text-4xl lg:text-5xl font-bold leading-tight hover:text-red-400">
													{post.data.titulo}
												</h1>
												<Button className="px-6 py-3 font-semibold text-white bg-red-500 hover:bg-red-400 rounded-lg">
													Ler Mais
												</Button>
											</div>
										</div>
									</div>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="left-4 bg-black/50 hover:bg-black/75 border-none text-white" />
					<CarouselNext className="right-4 bg-black/50 hover:bg-black/75 border-none text-white" />
				</Carousel>
			</div>

			{/* Preview thumbnails */}
			{carouselPosts.length > 1 && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
					{carouselPosts.map((post, index) => (
						<Link href={`/post/${post.uid}`} key={post.uid || index}>
							<div
								className="relative h-48 rounded-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 bg-center bg-no-repeat bg-cover"
								style={{
									backgroundImage: `url(${cdn(post.data.cover.url as string, 300, 0)})`,
								}}
							>
								<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
								<div className="absolute bottom-1 left-1 right-1">
									<p className="text-sm text-white font-medium truncate">
										{post.data.titulo}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
