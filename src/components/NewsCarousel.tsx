"use client";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import type { PostDocument } from "@/prismicio-types";
import { cdn } from "@/utils/cdn";

interface NewsCarouselProps {
	posts: PostDocument[];
}

export default function NewsCarousel({ posts }: NewsCarouselProps) {
	const carouselPosts = posts.slice(0, 1);

	if (carouselPosts.length === 0) {
		return null;
	}

	return (
		<div className="w-full mb-4">
			<Carousel
				opts={{ align: "start", loop: true }}
				plugins={[Autoplay({ delay: 5000 })]}
				className="w-full"
			>
				<CarouselContent>
					{carouselPosts.map((post, index) => (
						<CarouselItem key={post.uid || index}>
							<a href={`/post/${post.uid}`}>
								<div className="group relative h-96 md:h-150 overflow-hidden rounded-3xl bg-cover bg-no-repeat bg-center shadow-2xl">
									<div
										className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
										style={{
											backgroundImage: `url(${cdn(post.data.cover.url as string, 1920, 1080)})`,
										}}
									/>
									<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
									<div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-500" />
									<div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white transform transition-transform duration-500 group-hover:translate-y-2">
										<div className="max-w-4xl space-y-4">
											<span className="inline-block px-4 py-2 text-sm font-bold bg-linear-to-r from-red-600 to-red-500 text-white rounded-full shadow-lg">
												DESTAQUE
											</span>
											<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight group-hover:text-red-400 transition-colors duration-300">
												{post.data.titulo}
											</h1>
											<Button className="px-8 py-4 font-bold text-lg bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-0">
												Ler Mais
											</Button>
										</div>
									</div>
								</div>
							</a>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
