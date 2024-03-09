import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="mx-auto mt-40 text-center">
			<h2 className="mb-4 text-3xl font-bold">Página não encontrada</h2>
			<Link href="/">
				<span className="mr-2">&larr;</span>
				<span>Voltar á página inicial</span>
			</Link>
		</div>
	);
}
