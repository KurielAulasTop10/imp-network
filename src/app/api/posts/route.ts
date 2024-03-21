import { NextResponse } from 'next/server';

import { getAllPostsFromNotion } from '@/services/posts';
import { getErrorMessage } from '@/utils/get-error-message';
import redis from '@/libs/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
	await redis.del('allPosts');
	try {
		const allPosts = await getAllPostsFromNotion();
		return NextResponse.json({ posts: allPosts });
	} catch (e) {
		return NextResponse.json(
			{ error: getErrorMessage(e) },
			{ status: 500 },
		);
	}
}
