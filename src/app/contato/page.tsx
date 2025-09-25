import type { Metadata } from "next";
import Link from "next/link";
import {
	RiCheckLine,
	RiCustomerService2Line,
	RiDiscordFill,
	RiDiscordLine,
	RiInformationLine,
	RiMailFill,
	RiMailLine,
	RiTimeLine,
} from "react-icons/ri";

export const metadata: Metadata = {
	title: "Contatos",
	description:
		"É possível entrar em contato com a Império Network para assuntos de imprensa como também para feedbacks ou problemas.",
	twitter: {
		title: "Contatos",
		description:
			"É possível entrar em contato com a Império Network para assuntos de imprensa como também para feedbacks ou problemas.",
	},
};

export default function PrivacyPage() {
	return (
		<div className="flex flex-col gap-8 mt-8 max-w-4xl mx-auto px-6 lg:px-0">
			{/* Cabeçalho */}
			<div className="text-center mb-4">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
					<div className="w-2 h-12 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
					Contato
					<div className="w-2 h-12 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
				</h1>
				<div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full mx-auto"></div>
			</div>

			{/* Cards de Contato */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Email */}
				<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<RiMailFill className="text-2xl text-white" />
						</div>
						<h2 className="text-2xl font-bold text-white">Email</h2>
						<p className="text-gray-400 mt-2">Para assuntos de imprensa</p>
					</div>
					<Link
						href="mailto:imperiogames2019@gmail.com"
						target="_blank"
						className="inline-flex items-center gap-2 bg-gray-800 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 w-full justify-center"
					>
						<RiMailLine className="text-lg" />
						imperiogames2019@gmail.com
					</Link>
				</div>

				{/* Discord */}
				<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
							<RiDiscordFill className="text-2xl text-white" />
						</div>
						<h2 className="text-2xl font-bold text-white">Discord</h2>
						<p className="text-gray-400 mt-2">Resposta rápida e direta</p>
					</div>
					<Link
						href="https://dsc.gg/fybr"
						target="_blank"
						className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 w-full justify-center"
					>
						<RiDiscordLine className="text-lg" />
						Entrar no Discord
					</Link>
				</div>
			</div>

			{/* Informações Adicionais */}
			<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
				<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
					<RiInformationLine className="text-red-500" />
					Como Funciona o Atendimento
				</h2>

				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<RiCheckLine className="text-white text-lg" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Assuntos de Imprensa
							</h3>
							<p className="text-gray-300 leading-relaxed">
								Utilize o email para questões profissionais, parcerias e
								assuntos relacionados à imprensa.
							</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<RiCustomerService2Line className="text-white text-lg" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Suporte Geral
							</h3>
							<p className="text-gray-300 leading-relaxed">
								Para sugestões, dúvidas, problemas com o site ou bugs, o Discord
								é o canal mais rápido.
							</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<RiTimeLine className="text-white text-lg" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Tempo de Resposta
							</h3>
							<p className="text-gray-300 leading-relaxed">
								Geralmente respondemos rapidamente no Discord. No email, o tempo
								pode variar conforme a demanda.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Mensagem Final */}
			<div className="text-center mt-2 p-8 bg-gradient-to-r from-red-600/10 to-red-500/10 rounded-2xl border border-red-500/20">
				<h2 className="text-2xl font-bold text-white mb-4">
					💬 Estamos Aqui para Ajudar!
				</h2>
				<p className="text-gray-300 text-lg">
					A Império Network valoriza cada contato e está sempre disposta a ouvir
					comentários e sugestões dos nossos leitores.
				</p>
			</div>
		</div>
	);
}
