import Image from "next/image";
import type { AuthorDocument } from "../../../prismicio-types";
import { PrismicRichText } from "@prismicio/react";

export default function AuthorBox({ uid, data }: AuthorDocument) {
	return (
		<div
			style={{
				background: `url(${data.banner.url})`,
			}}
			className="rounded-md bg-center bg-cover"
		>
			<div className="flex gap-3 items-center h-full w-full bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-2">
				<Image
					src={data.avatar.url || ""}
					className="rounded-md"
					width={48}
					height={48}
					quality={30}
					alt={data.avatar.alt || ""}
				/>
				<div className="flex flex-col">
					<span className="flex text-white text-lg font-light items-center gap-2 capitalize">
						{uid.replaceAll("-", " ")}
						<span className="text-xs text-gray-300 bg-red-600 w-fit px-1 rounded-sm font-thin">
							Autor
						</span>
					</span>
					<p className="text-sm text-gray-200 flex font-thin">
						<PrismicRichText field={data.descricao} />
					</p>
				</div>
			</div>
		</div>
	);
}
