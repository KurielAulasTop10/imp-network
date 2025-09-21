import Link from "next/link";
import { cdn } from "@/utils/cdn";

interface AnuncioDocumentData {
	data: {
		link: {
			url: string;
		};
		imagem: {
			url: string;
		};
	};
}

export default async function Ad({
	ad,
	index,
}: {
	ad: AnuncioDocumentData[];
	index: number;
}) {
	return (
		<Link href={ad[index].data.link?.url as string} target="_blank">
			{/** biome-ignore lint/performance/noImgElement: false */}
			<img
				src={cdn(ad[index].data.imagem.url as string, 0, 0)}
				alt="ANÚNCIO"
				className="w-full object-center rounded-md"
				loading="lazy"
			/>
		</Link>
	);
}
