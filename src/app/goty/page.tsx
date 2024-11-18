"use client";
import { cdn } from "@/utils/cdn";
import Link from "next/link";
import Script from "next/script";

export default function GOTYPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b text-white">
			<div className="mx-auto px-2 py-16">
				

				<div className="flex flex-col items-center justify-center md:flex-row gap-12">
					<div className="relative w-full max-w-lg">
						<img
							src={cdn("https://i.ibb.co/KNCZ6g4/image-2.png", 0, 650)}
							alt="GOTY Trophy"
							className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
						/>
					</div>

					<div className="flex-col hover:scale-105 transform transition-transform duration-300">
						<div className="text-center mb-12">
					<h1 className="text-6xl font-extrabold mb-4 tracking-wide text-white">
						The Game Awards 2024
					</h1>
					<p className="text-2xl font-light text-gray-200 max-w-3xl mx-auto">
						O maior evento de jogos está de volta! Fique por dentro das
						novidades e vote no jogo que merece o prêmio mais prestigiado.
							</p>
							<Link
							href="https://thegameawards.com/"
							target="_blank"
							className="bg-red-600 hover:bg-red-800 p-3 rounded-xl text-xl font-bold text-center text-white block mt-5"
						>
							Vote Agora!
						</Link>
				</div>
						
					</div>
				</div>
				<div className="flex flex-col mx-auto mt-20 gap-8">
					<h2 className="text-4xl font-semibold text-center tracking-wide text-white">
						Prepare-se dia 12 de Dezembro.
					</h2>
					<iframe
						src="https://www.youtube.com/embed/GeqkJ5zswKc?si=kVxz6wUQprzdM0vx"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
                        className="mx-auto rounded-md w-2/4 aspect-video"
						allowFullScreen
					/>
					<h2 className="text-4xl font-semibold text-center tracking-wide text-white">
						Nomeados a GOTY
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
						{[
							{
								title: "Black Myth: Wukong",
								description:
									"Black Myth: Wukong é um RPG de ação inspirado na mitologia chinesa. Você assume o papel do Predestinado e tem a responsabilidade de encarar os desafios e as maravilhas do mundo para desvendar a verdade obscura por trás de uma lenda gloriosa do passado.",
								image: "https://i.ibb.co/tPVDTTb/image.png",
							},
							{
								title: "Metaphor: ReFantazio",
								description:
									"O trono está abandonado após o assassinato do rei. Sem herdeiros, o desejo do falecido rei decreta que o próximo monarca será eleito pelo povo, dando início à luta pelo trono. ",
								image: "https://i.ibb.co/FhX7tDv/image.png",
							},
							{
								title: "Astro Bot",
								description:
									"A nave mãe PS5® foi destruída e deixou a tripulação de Bots do ASTRO espalhada por diversas galáxias. Está na hora de percorreres mais de 50 planetas no teu fiel Dual Speeder.",
								image: "https://i.ibb.co/RCHQxHk/image.png",
							},
							{
								title: "Balatro",
								description:
									"O pôquer roguelike. Balatro é um jogo de criação de baralho hipnoticamente satisfatório em que você joga mãos de pôquer ilegais, descobre curingas que mudam o jogo e aciona combos escandalosos e cheios de adrenalina.",
								image: "https://i.ibb.co/9wPm0bQ/image.png",
							},
							{
								title: "Final Fantasy VII Rebirth",
								description:
									"Os lendários heróis Cloud, Barret, Tifa, Aerith e Red XIII escaparam da cidade distópica de Midgar e estão agora em busca de Sephiroth, o vingativo espadachim do passado de Cloud que todos julgavam morto.",
								image: "https://i.ibb.co/jrG6Fnv/image.png",
							},
							{
								title: "Elden Ring Shadow of the Erdtree",
								description:
									"Sombrio e intenso, Shadow of the Erdtree leva os jogadores a continuarem sua missão com a liberdade de explorar e vivenciar a aventura no seu próprio ritmo.",
								image: "https://i.ibb.co/vPxwGcc/image.png",
							},
						].map((nominee) => (
							<div
								key={nominee.title}
								className="flex flex-col bg-black rounded-md p-5 gap-3"
							>
								<img
									src={cdn(nominee.image, 512, 512)}
									alt={nominee.title}
									className="rounded-md"
								/>
								<h3 className="text-xl font-semibold text-center">
									{nominee.title}
								</h3>
								<h4 className="text-lg text-gray-300 font-medium text-center">
									{nominee.description}
								</h4>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
