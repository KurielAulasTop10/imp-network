export default function SyncPage() {
	const sync = async () => {
		const postsRes = await fetch("/api/posts");
		if (postsRes.status === 200) {
			return 0;
		}
	};

	sync();

	return (
		<div className="mt-[10vh] text-center">
			<p className="text-3xl">
				Pronto, agora clique no logo, aperte F5 e se continuar a não aparecer,
				aperte F5 novamente!
			</p>
		</div>
	);
}
