import Link from "next/link";

export default function PrivacyPage() {
	return (
		<div className="flex flex-col gap-5 mt-5 px-10 md:px-20 font-light">
			<h3 className="text-2xl font-normal mb-2 flex gap-3 items-center justify-start">
				<div className="w-1 h-4 bg-red-600 rounded-r-md" /> Contato
			</h3>
			<p className="text-lg">
				Se você deseja entrar em contato com a Império Network para assuntos de
				imprensa, basta enviar um e-mail para{" "}
				<Link
					href="mailto:imperiogames2019@gmail.com"
					target="_blank"
					className="text-red-600 hover:text-red-400"
				>
					imperiogames2019@gmail.com
				</Link>{" "}
				ou entrar em contato com a equipe através de mensagem privada (ou
				criando um ticket de Dúvida na aba Suporte no canal ajuda) no{" "}
				<Link
					href="https://dsc.gg/fybr"
					target="_blank"
					className="text-red-600 hover:text-red-400"
				>
					Discord
				</Link>
				.
			</p>
			<p className="text-lg">
				Para outros tipos de contato, como sugestões, dúvidas, problemas com o
				site ou bugs, você também pode entrar em contato com a equipe através do{" "}
				<Link
					href="https://dsc.gg/fybr"
					target="_blank"
					className="text-red-600 hover:text-red-400"
				>
					Discord
				</Link>
				, onde geralmente respondemos rapidamente. A Império Network está sempre
				disposta a ouvir os comentários e sugestões de seus leitores e faz o
				possível para resolver quaisquer problemas ou questões o mais rápido
				possível.
			</p>
		</div>
	);
}
