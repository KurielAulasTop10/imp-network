import type { Post } from "@/types/post";

export default function AuthorBox({ post: { author } }: { post: Post }) {
	type AuthorInfo = {
		name: string;
		description: string;
		imgURL: string;
	};

	type Authors = {
		Kuriel: AuthorInfo;
		Kazezinhu: AuthorInfo;
		Império: AuthorInfo;
		Taipan: AuthorInfo;
	};

	const authors = {
		Kuriel: {
			name: "Kuriel",
			description:
				"Olá! Meu nome é Kuriel e sou responsável pelo conteúdo que você acabou de ler.",
			imgURL: "https://i.imgur.com/tjpcf6Q.jpeg",
		},
		Kazezinhu: {
			name: "Kazezinhu",
			description:
				"Amante de jogos, animes e tecnologia. Seja bem vindo e espero que tenha gostado!",
			imgURL: "https://i.imgur.com/p4tkDIo.png",
		},
		Império: {
			name: "Imprensa Império Network",
			description: "Somos Império! Somos simples!",
			imgURL: "https://i.imgur.com/2r6fdnK.jpeg",
		},
		Taipan: {
			name: "Taipan",
			description:
				"Olá, eu sou o Taipan, aficionado por jogos e responsável pela análise que você acabou de ler. Caso tenha dúvidas ou sugestões, não deixe de comentar.",
			imgURL: "https://i.imgur.com/CDOfE3N.gif",
		},
	};

	const authorInfo = authors[author as keyof Authors];

	return (
		<div className="border-red-600 bg-black border-[1px] rounded-[3px] p-3 flex flex-col md:flex-row w-full items-center justify-start gap-5 mt-5 px-10">
			<img
				src={authorInfo.imgURL}
				alt={authorInfo.name}
				width={100}
				height={100}
				className="rounded-[3px]"
			/>
			<div className="flex flex-col max-md:items-center max-md:text-center">
				<h3 className="text-xl text-white font-bold flex gap-2 w-fit items-center">
					{authorInfo.name}
					<span className="text-xs text-white bg-red-600 w-fit p-1 rounded-[3px] font-medium">
						Autor
					</span>
				</h3>
				<p className="text-gray-400 text-base">{authorInfo.description}</p>
			</div>
		</div>
	);
}
