import Link from "next/link";

export default function CategoryList({ categories }: { categories: string[] }) {
	return (
		<div className="flex space-x-2 flex-wrap">
			{categories.map((category) => (
				<Link
					href={`/categoria/${category}`}
					key={category}
					className="bg-red-600 rounded-sm px-4 py-2 md:px-3 md:py-[6px] text-xs uppercase font-semibold"
				>
					{category}
				</Link>
			))}
		</div>
	);
}
