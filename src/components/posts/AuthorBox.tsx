import { PrismicRichText } from "@prismicio/react";
import { cdn } from "@/utils/cdn";
import type { AuthorDocument } from "../../../prismicio-types";

export default function AuthorBox({ uid, data }: AuthorDocument) {
	return (
		<div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
			<h3 className="text-white text-xl font-bold mb-4">Redigido por</h3>
			<div className="flex gap-4 items-start">
				<img
					src={cdn(data.avatar.url as string, 64, 64)}
					className="rounded-full w-16 h-16 object-cover shadow-md border-2 border-red-500"
					alt={data.avatar.alt || ""}
					loading="lazy"
				/>
				<div className="flex-1">
					<span className="text-red-400 text-xl font-bold capitalize block mb-2">
						{uid.replaceAll("-", " ")}
					</span>
					<div className="text-gray-300 leading-relaxed">
						<PrismicRichText
							field={data.descricao}
							components={{
								paragraph: ({ text }: { text: string }) => (
									<p className="mb-2 last:mb-0">{text}</p>
								),
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
