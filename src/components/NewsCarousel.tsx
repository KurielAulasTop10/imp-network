"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { cdn } from "@/utils/cdn";
import type { PostDocument } from "../../prismicio-types";

interface NewsCarouselProps {
	posts: PostDocument[];
}

export default function NewsCarousel({ posts }: NewsCarouselProps) {
	// Take only the first 5 posts for the carousel
	const carouselPosts = posts.slice(0, 1);

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
												<Button className="px-6 py-3 font-semibold text-white bg-red-500 hover:bg-red-400 rounded-lg cursor-pointer">
													Ler Mais
												</Button>
											</div>
										</div>
									</div>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}
