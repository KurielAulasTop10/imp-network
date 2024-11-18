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
		<div className="flex flex-col gap-5 mt-5 px-10 md:px-20 font-light text-justify">
			<h1 className="text-2xl font-normal mb-2 flex gap-3 items-center justify-start">
				<div className="w-1 h-4 bg-red-600 rounded-r-md" /> Política de Análises
			</h1>
			<p className="text-lg">
				A Império Network anunciou recentemente uma nova política de análises
				aplicada a partir de 24 de Junho de 2024 destinada a seus jornalistas.
				Esta iniciativa visa padronizar e otimizar o processo de avaliação de
				conteúdos, garantindo clareza e consistência nos feedbacks. Utilizando
				ícones de rosto feliz, neutro e triste, a nova política pretende
				facilitar a comunicação das impressões dos críticos de maneira mais
				intuitiva e eficaz sem sobrepor demasiado um produto a outro.
			</p>
			<h2 className="text-xl font-normal mb-2">
				Objetivos da Nova Política de Análises
			</h2>
			<p className="text-lg">
				A política de análises tem como foco principal aprimorar a qualidade das
				avaliações publicadas no site. Os objetivos específicos incluem:
			</p>
			<ul className="list-disc pl-5">
				<li className="text-lg">
					<strong>Simplificação do Feedback:</strong> Utilização de ícones
					visualmente intuitivos para que os jornalistas possam expressar
					rapidamente suas opiniões sobre os conteúdos analisados.
				</li>
				<li className="text-lg">
					<strong>Uniformidade nas Avaliações:</strong> Padronização do sistema
					de feedback para garantir que as críticas sejam consistentes e
					comparáveis.
				</li>
			</ul>
			<h2 className="text-xl font-normal mb-2">
				Significado dos Ícones de Rosto
			</h2>
			<div className="flex max-md:flex-col gap-5 items-center">
				<RiEmotionHappyFill className="w-16 h-16 text-green-400" />
				<div className="flex flex-col items-start gap-5">
					<p className="text-lg">
						<strong>Significado:</strong> O conteúdo analisado superou as
						expectativas.
					</p>
					<p className="text-lg">
						<strong>Interpretação:</strong> Indica uma experiência altamente
						positiva, destacando-se pela qualidade.
					</p>
				</div>
			</div>
			<div className="flex max-md:flex-col gap-5 items-center">
				<RiEmotionNormalFill className="w-16 h-16 text-orange-300" />
				<div className="flex flex-col items-start gap-5">
					<p className="text-lg">
						<strong>Significado:</strong> O conteúdo atendeu às expectativas
						básicas, sem se destacar.
					</p>
					<p className="text-lg">
						<strong>Interpretação:</strong> Representa uma experiência mediana,
						indicando que o produto ou serviço é aceitável.
					</p>
				</div>
			</div>
			<div className="flex max-md:flex-col gap-5 items-center">
				<RiEmotionUnhappyFill className="w-16 h-16 text-red-500" />
				<div className="flex flex-col items-start gap-5">
					<p className="text-lg">
						<strong>Significado:</strong> O conteúdo ficou aquém das
						expectativas.
					</p>
					<p className="text-lg">
						<strong>Interpretação:</strong> Reflete uma experiência negativa,
						sugerindo problemas ou deficiências significativas.
					</p>
				</div>
			</div>
			<h2 className="text-xl font-normal mb-2">
				Processo de Avaliação e Implementação de Feedback
			</h2>
			<p className="text-lg">
				Os jornalistas utilizam os ícones ao final de suas análises, oferecendo
				uma visão clara e imediata de suas impressões.
			</p>
			<p className="text-lg">
				Com a nova política de análises, a Império Network busca não apenas
				aprimorar a qualidade e consistência de suas críticas, mas também
				fornecer aos leitores avaliações mais claras e confiáveis. Esta
				abordagem inovadora reflete o compromisso da plataforma em manter-se na
				vanguarda das avaliações de entretenimento e tecnologia, garantindo que
				suas análises sejam sempre relevantes e precisas.
			</p>
		</div>
	);
}
