/** biome-ignore-all lint/performance/noImgElement: false */
import type { Metadata } from "next";
import Link from "next/link";
import { RiAwardFill, RiExternalLinkLine } from "react-icons/ri";
import { cdn } from "@/utils/cdn";

export const metadata: Metadata = {
	title: "Evento The Game Awards",
	description:
		"Página dedicada ao evento The Game Awards possuindo informações como nomeados e datas, como também pequenos resumos do que se trata.",
	twitter: {
		title: "Evento The Game Awards",
		description:
			"Página dedicada ao evento The Game Awards possuindo informações como nomeados e datas, como também pequenos resumos do que se trata.",
	},
};

export default function GOTYPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
			<div className="mx-auto px-4 py-16 max-w-7xl">
				{/* Hero Section */}
				<div className="flex flex-col items-center justify-center lg:flex-row gap-12 mb-20">
					<div className="w-full max-w-lg">
						<div>
							<img
								src={cdn("https://i.ibb.co/KNCZ6g4/image-2.png", 0, 0)}
								alt="GOTY Trophy"
								className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
							/>
						</div>
					</div>

					<div className="flex flex-col items-center text-center lg:text-left lg:items-start">
						<div className="mb-2">
							<span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-2">
								EVENTO ANUAL
							</span>
						</div>
						<h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							The Game Awards {new Date().getFullYear()}
						</h1>
						<p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
							O maior evento de jogos está de volta! Fique por dentro das
							novidades e vote no jogo que merece o prêmio mais prestigiado.
						</p>
						<Link
							href="https://thegameawards.com/"
							target="_blank"
							className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center gap-3"
						>
							<RiAwardFill className="text-xl" />
							Vote Agora!
							<RiExternalLinkLine className="text-lg" />
						</Link>
					</div>
				</div>

				{/* Video Section */}
				<div className="flex flex-col items-center gap-12 mb-20">
					<div className="text-center">
						<h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Prepare-se para 12 de Dezembro
						</h2>
						<p className="text-xl text-gray-400 max-w-3xl">
							Não perca o maior evento da indústria de games com anúncios
							exclusivos e premiações
						</p>
					</div>

					<div className="relative w-full max-w-4xl group">
						<iframe
							src="https://www.youtube.com/embed/LfnUQ-qKsdQ?si=kVxz6wUQprzdM0vx"
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							className="w-full aspect-video rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
							allowFullScreen
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 group-hover:scale-[1.02] transition-transform duration-500 to-transparent rounded-3xl pointer-events-none" />
					</div>
				</div>

				{/* Nominees Section */}
				<div className="flex flex-col gap-12">
					<div className="text-center">
						<h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Nomeados ao GOTY {new Date().getFullYear()}
						</h2>
						<p className="text-xl text-gray-400 max-w-3xl mx-auto">
							Conheça os jogos que estão concorrendo ao prémio da noite
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
									"O trono está abandonado após o assassinato do rei. Sem herdeiros, o desejo do falecido rei decreta que o próximo monarca será eleito pelo povo, dando início à luta pelo trono.",
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
						].map((nominee, index) => (
							<div
								key={nominee.title}
								className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border border-gray-700 hover:border-red-500/50"
							>
								<div className="relative overflow-hidden rounded-2xl mb-4">
									<img
										src={cdn(nominee.image, 0, 192)}
										alt={nominee.title}
										className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
										loading="lazy"
									/>
									<div className="absolute top-4 right-4">
										<span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold">
											#{index + 1}
										</span>
									</div>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>

								<h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-red-400 transition-colors duration-300">
									{nominee.title}
								</h3>
								<p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
									{nominee.description}
								</p>

								<div className="mt-4 flex justify-center">
									<span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
										GOTY NOMINEE
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Final CTA */}
				<div className="text-center mt-16 p-8 bg-gradient-to-r from-red-600/10 to-red-500/10 rounded-3xl border border-red-500/20">
					<h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
						🎮 Sua Voz Importa!
					</h2>
					<p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
						Participe da votação e ajude a decidir qual jogo levará o prêmio do
						The Game Awards {new Date().getFullYear()}
					</p>
					<Link
						href="https://thegameawards.com/"
						target="_blank"
						className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
					>
						<RiAwardFill />
						Votar nos Nomeados
						<RiExternalLinkLine />
					</Link>
				</div>
			</div>
		</div>
	);
}
