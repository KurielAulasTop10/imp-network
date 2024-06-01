import { NextResponse } from "next/server";

import redis from "@/libs/redis";

export const dynamic = "force-dynamic";

export async function GET() {
	await redis.del("allPosts");

	return NextResponse.json({ status: 200 });
}
