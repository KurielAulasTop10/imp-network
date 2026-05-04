import { cdn } from "@/utils/cdn";

interface AnuncioDocumentData {
	data: {
		link: { url: string };
		imagem: { url: string };
	};
}

export default function Ad({
	ad,
	index,
}: {
	ad: AnuncioDocumentData[];
	index: number;
}) {
	return (
		<a
			href={ad[index].data.link?.url as string}
			target="_blank"
			rel="noopener noreferrer"
			className="mb-3"
		>
			<img
				src={cdn(ad[index].data.imagem.url as string, 0, 0)}
				alt="ANÚNCIO"
				className="w-full object-center rounded-md"
				loading="lazy"
			/>
		</a>
	);
}
