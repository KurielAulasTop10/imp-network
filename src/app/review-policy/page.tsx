import type { Metadata } from "next";
import {
	RiEmotionHappyFill,
	RiEmotionNormalFill,
	RiEmotionUnhappyFill,
} from "react-icons/ri";

export const metadata: Metadata = {
	title: "Política de Análises",
	description:
		"Esta página dedica-se ao conteúdo sobre as nossas análises, caracterizando como a Império Network funciona ao dar avaliações e o que cada parte desse sistema significa.",
	twitter: {
		title: "Política de Análises",
		description:
			"Esta página dedica-se ao conteúdo sobre as nossas análises, caracterizando como a Império Network funciona ao dar avaliações e o que cada parte desse sistema significa.",
	},
};

export default function PrivacyPage() {
	return (
		<div className="flex flex-col gap-8 mt-8 max-w-4xl mx-auto px-6 lg:px-0">
			{/* Cabeçalho */}
			<div className="text-center mb-4">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
					<div className="w-2 h-12 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
					Política de Análises
					<div className="w-2 h-12 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
				</h1>
				<div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full mx-auto"></div>
			</div>

			{/* Introdução */}
			<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
				<p className="text-lg leading-relaxed text-gray-300">
					A Império Network anunciou recentemente uma nova política de análises
					aplicada a partir de 24 de Junho de 2024 destinada a seus jornalistas.
					Esta iniciativa visa padronizar e otimizar o processo de avaliação de
					conteúdos, garantindo clareza e consistência nos feedbacks. Utilizando
					ícones de rosto feliz, neutro e triste, a nova política pretende
					facilitar a comunicação das impressões dos críticos de maneira mais
					intuitiva e eficaz sem sobrepor demasiado um produto a outro.
				</p>
			</div>

			{/* Objetivos */}
			<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
				<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
					<div className="w-1 h-6 bg-red-500 rounded-r-md" />
					Objetivos da Nova Política de Análises
				</h2>
				<p className="text-lg leading-relaxed text-gray-300 mb-4">
					A política de análises tem como foco principal aprimorar a qualidade
					das avaliações publicadas no site. Os objetivos específicos incluem:
				</p>
				<ul className="space-y-3">
					<li className="flex items-start gap-3">
						<div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
						<span className="text-lg leading-relaxed text-gray-300">
							<strong className="text-white">Simplificação do Feedback:</strong>{" "}
							Utilização de ícones visualmente intuitivos para que os
							jornalistas possam expressar rapidamente suas opiniões sobre os
							conteúdos analisados.
						</span>
					</li>
					<li className="flex items-start gap-3">
						<div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
						<span className="text-lg leading-relaxed text-gray-300">
							<strong className="text-white">
								Uniformidade nas Avaliações:
							</strong>{" "}
							Padronização do sistema de feedback para garantir que as críticas
							sejam consistentes e comparáveis.
						</span>
					</li>
				</ul>
			</div>

			{/* Significado dos Ícones */}
			<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
				<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
					<div className="w-1 h-6 bg-red-500 rounded-r-md" />
					Significado dos Ícones de Rosto
				</h2>

				{/* Ícone Feliz */}
				<div className="flex max-md:flex-col gap-6 items-center p-6 bg-gray-800/50 rounded-xl mb-6">
					<div className="flex flex-col items-center gap-2 w-1/4">
						<RiEmotionHappyFill className="w-20 h-20 text-green-400 drop-shadow-lg" />
						<span className="text-green-400 font-semibold">Excelente</span>
					</div>
					<div className="flex-1 space-y-3">
						<p className="text-lg text-gray-300">
							<strong className="text-white">Significado:</strong> O conteúdo
							analisado superou as expectativas.
						</p>
						<p className="text-lg text-gray-300">
							<strong className="text-white">Interpretação:</strong> Indica uma
							experiência altamente positiva, destacando-se pela qualidade.
						</p>
					</div>
				</div>

				{/* Ícone Neutro */}
				<div className="flex max-md:flex-col gap-6 items-center p-6 bg-gray-800/50 rounded-xl mb-6">
					<div className="flex flex-col items-center gap-2 w-1/4">
						<RiEmotionNormalFill className="w-20 h-20 text-yellow-400 drop-shadow-lg" />
						<span className="text-yellow-400 font-semibold">Regular</span>
					</div>
					<div className="flex-1 space-y-3">
						<p className="text-lg text-gray-300">
							<strong className="text-white">Significado:</strong> O conteúdo
							atendeu às expectativas básicas, sem se destacar.
						</p>
						<p className="text-lg text-gray-300">
							<strong className="text-white">Interpretação:</strong> Representa
							uma experiência mediana, indicando que o produto ou serviço é
							aceitável.
						</p>
					</div>
				</div>

				{/* Ícone Triste */}
				<div className="flex max-md:flex-col gap-6 items-center p-6 bg-gray-800/50 rounded-xl">
					<div className="flex flex-col items-center gap-2 w-1/4">
						<RiEmotionUnhappyFill className="w-20 h-20 text-red-400 drop-shadow-lg" />
						<span className="text-red-400 font-semibold">Insatisfatório</span>
					</div>
					<div className="flex-1 space-y-3">
						<p className="text-lg text-gray-300">
							<strong className="text-white">Significado:</strong> O conteúdo
							ficou aquém das expectativas.
						</p>
						<p className="text-lg text-gray-300">
							<strong className="text-white">Interpretação:</strong> Reflete uma
							experiência negativa, sugerindo problemas ou deficiências
							significativas.
						</p>
					</div>
				</div>
			</div>

			{/* Processo de Avaliação */}
			<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
				<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
					<div className="w-1 h-6 bg-red-500 rounded-r-md" />
					Processo de Avaliação e Implementação de Feedback
				</h2>
				<p className="text-lg leading-relaxed text-gray-300 mb-4">
					Os jornalistas utilizam os ícones ao final de suas análises,
					oferecendo uma visão clara e imediata de suas impressões.
				</p>
				<p className="text-lg leading-relaxed text-gray-300">
					Com a nova política de análises, a Império Network busca não apenas
					aprimorar a qualidade e consistência de suas críticas, mas também
					fornecer aos leitores avaliações mais claras e confiáveis. Esta
					abordagem inovadora reflete o compromisso da plataforma em manter-se
					na vanguarda das avaliações de entretenimento e tecnologia, garantindo
					que suas análises sejam sempre relevantes e precisas.
				</p>
			</div>

			{/* Destaque Final */}
			<div className="text-center mt-2 p-8 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-2xl border border-green-500/20">
				<h2 className="text-2xl font-bold text-white mb-4">
					🎯 Sistema Transparente
				</h2>
				<p className="text-gray-300 text-lg">
					Nosso compromisso é fornecer avaliações claras e consistentes para
					você!
				</p>
			</div>
		</div>
	);
}
