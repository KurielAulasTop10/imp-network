import Link from "next/link";

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
}: { ad: AnuncioDocumentData[]; index: number }) {
	return (
		<Link href={ad[index].data.link?.url as string} target="_blank">
			<img
				src={ad[index].data.imagem.url.replace("auto=format,compress&", "") as string}
				alt="ANÚNCIO"
				className="w-full object-center rounded-md"
			/>
		</Link>
	);
}
