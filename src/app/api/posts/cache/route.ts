import { NextResponse } from 'next/server';

import { getAllPostsFromNotion } from '@/services/posts';
import { getErrorMessage } from '@/utils/get-error-message';
import redis from '@/libs/redis';

export async function GET() {
	try {
		await redis.del('allPosts');
		const allPosts = await getAllPostsFromNotion();
		return NextResponse.json({ posts: allPosts });
	} catch (e) {
		return NextResponse.json(
			{ error: getErrorMessage(e) },
			{ status: 500 },
		);
	}
}
