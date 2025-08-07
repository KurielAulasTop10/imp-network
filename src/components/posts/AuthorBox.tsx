import { PrismicRichText } from "@prismicio/react";
import { cdn } from "@/utils/cdn";
import type { AuthorDocument } from "../../../prismicio-types";

export default function AuthorBox({ uid, data }: AuthorDocument) {
	return (
		<div className="flex gap-3 items-center h-full w-full rounded-md bg-black p-2">
			<img
				src={cdn(data.avatar.url as string, 48, 48)}
				className="rounded-md"
				alt={data.avatar.alt || ""}
			/>
			<div className="flex flex-col">
				<span className="flex text-white text-lg font-light items-center gap-2 capitalize">
					{uid.replaceAll("-", " ")}
					<span className="text-xs text-gray-300 bg-red-600 w-fit px-1 rounded-sm font-thin">
						Autor
					</span>
				</span>
				<PrismicRichText
					field={data.descricao}
					components={{
						paragraph: ({ text }) => (
							<p className="text-sm text-gray-200 flex font-thin">{text}</p>
						),
					}}
				/>
			</div>
		</div>
	);
}
