import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sobre Nós",
	description:
		"A Império Network foi fundada originalmente em 2018. E esta é só uma pequena parte da nossa história, nesta página é escrito tudo sobre o nosso portal desde o início.",
	twitter: {
		title: "Sobre Nós",
		description:
			"A Império Network foi fundada originalmente em 2018. E esta é só uma pequena parte da nossa história, nesta página é escrito tudo sobre o nosso portal desde o início.",
	},
};

export default function AboutPage() {
	return (
		<div className="flex flex-col gap-8 mt-8 max-w-4xl mx-auto px-6 lg:px-0">
			{/* Cabeçalho */}
			<div className="text-center mb-2">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
					<div className="w-2 h-12 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
					Sobre Nós
					<div className="w-2 h-12 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
				</h1>
				<div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full mx-auto"></div>
			</div>

			{/* Conteúdo */}
			<div className="space-y-8">
				<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 flex flex-col gap-5">
					<p className="text-lg leading-relaxed text-gray-300">
						A Império Network foi fundada originalmente em 2018 como um servidor
						na plataforma Discord. No entanto, com o tempo, a Império Network
						evoluiu para se tornar a Império Games, com o objetivo de preencher
						uma necessidade vazia no mercado. Com o passar dos anos, o catálogo
						da Império Games expandiu-se para incluir notícias sobre jogos,
						animes, tecnologia, tutoriais, análises e muito mais. Como tal, foi
						necessário mudar o nome da empresa de Império Games e Império Animes
						para Império Network, para refletir o alcance ampliado de seus
						serviços.
					</p>
					<p className="text-lg leading-relaxed text-gray-300">
						A Império Network é um site que reúne todo o catálogo de notícias
						sobre jogos, animes e tecnologia em um único lugar, tornando mais
						fácil para os leitores acessar todas essas informações em um único
						domínio. O objetivo da Império Network é simplificar o acesso dos
						leitores a notícias e informações sobre esses universos, reunindo
						todas as Impérios em um só lugar.
					</p>
					<p className="text-lg leading-relaxed text-gray-300">
						Embora tenhamos perdido algumas notícias ao longo do caminho, as
						Impérios já publicaram cerca de 1000 notícias no total, o que é uma
						realização significativa. É triste ver tanto trabalho que marcou a
						nossa história perdido, mas esses altos e baixos fazem parte da
						jornada. A Império nunca desiste de seus objetivos e continuará
						trabalhando para fornecer notícias e informações de qualidade para
						os seus leitores.
					</p>
					<p className="text-lg leading-relaxed text-gray-300">
						Informar os nossos leitores sobre o que está acontecendo atualmente
						em assuntos relacionados a jogos, animes e tecnologia sempre foi a
						nossa prioridade. É incrível ver o quanto a Império cresceu desde o
						início, e isso é resultado do trabalho dedicado e empenhado de todos
						os envolvidos, desde os leitores até a equipe interna. A Império tem
						muito orgulho do trabalho realizado e continuará a fornecer notícias
						e informações de qualidade para os seus leitores.
					</p>

					<p className="text-lg leading-relaxed text-gray-300">
						Hoje em dia, a Império Network está muito maior do que antes, e isso
						é resultado do apoio de nossas parcerias e leitores, que sempre
						recomendaram a Império a amigos, familiares e outras pessoas. A
						dedicação de todos em manter a Império atualizada com as últimas
						notícias e informações é apreciada e contribui para o sucesso da
						empresa. A Império agradece a todos os que fazem parte da sua
						história e espera continuar fornecendo notícias e informações de
						qualidade para todos os seus leitores no futuro.
					</p>
				</div>
			</div>

			{/* Destaque final */}
			<div className="text-center mt-2 p-8 bg-gradient-to-r from-red-600/10 to-red-500/10 rounded-2xl border border-red-500/20">
				<h2 className="text-2xl font-bold text-white mb-4">
					🚀 Juntos desde 2018
				</h2>
				<p className="text-gray-300 text-lg">
					Obrigado por fazer parte da nossa história!
				</p>
			</div>
		</div>
	);
}
