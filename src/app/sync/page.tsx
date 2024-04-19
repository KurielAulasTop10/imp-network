import { getAllPostsFromNotion } from '@/services/posts';
import { toUniqueArray } from '@/utils/to-unique-array';

export default function SyncPage() {
	const generateRandomString = () => {
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';

		for (let i = 0; i < 32; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomIndex);
		}

		return result;
	};

	const sync = async () => {
		const postsRes = await fetch(`/api/posts`);
		if (postsRes.status === 200) {
			const allPosts = await getAllPostsFromNotion();

			return toUniqueArray(
				allPosts
					.filter(post => post.published)
					.filter(post =>
						post.categories.includes(generateRandomString()),
					)
					.map(post => post),
			).sort();
		}
	};

	sync();

	return (
		<div className="mt-[10vh] text-center">
			<p className="text-3xl">
				Pronto, agora clique no logo, aperte F5 e se continuar a não
				aparecer, aperte F5 novamente!
			</p>
		</div>
	);
}
