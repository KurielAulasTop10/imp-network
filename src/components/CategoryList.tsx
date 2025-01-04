import Link from "next/link";

export default function CategoryList({ categories }: { categories: string[] }) {
	return (
		<div className="flex space-x-2 flex-wrap">
			{categories.map((category) => (
				<Link
					href={`/categoria/${category}`}
					key={category}
					className="text-red-600 bg-red-600/30 hover:bg-red-600 hover:text-white rounded-md px-2 py-1 text-sm capitalize font-normal"
				>
					{category}
				</Link>
			))}
		</div>
	);
}
