import { NextResponse } from "next/server";

import redis from "@/libs/redis";

export const dynamic = "force-dynamic";

export async function GET() {
	await redis.del("allPosts");
	await redis.del("recordMap:2559100900db4df88d908168e5bb1d56");

	return NextResponse.json({ status: 200 });
}
