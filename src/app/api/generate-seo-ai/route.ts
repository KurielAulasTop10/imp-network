import { createMigration, createWriteClient } from "@prismicio/client";
import { type NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    const { title, slug } = await request.json();
    if (!title)
        return NextResponse.json({ message: "title is required" }, { status: 401 });
    if (!slug)
        return NextResponse.json({ content: "slug is required" }, { status: 401 });
    const client = new OpenAI({
        baseURL: "https://api.electronhub.ai",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const completionSEO = await client.chat.completions.create({
        model: "gemini-2.0-flash-001",
        messages: [
            {
                role: "system",
                content:
                    "Gere somente uma descrição de SEO atrativo para a notícia com o título que o usuário mandar. Apenas envie a descrição do SEO, e mais nada. É importante que fales em português. Não uses emojis.",
            },
            {
                role: "user",
                content: title,
            },
        ],
    });
    const prismicio = createWriteClient(
        "imperio-network",
        {
            writeToken: process.env.PRISMIC_WRITE_TOKEN as string,
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        },
    );
    const migration = createMigration();
    const post = await prismicio.getByUID("post", slug);
    post.data.seo_description = completionSEO.choices[0].message.content;
    migration.updateDocument(post);
    await prismicio.migrate(migration);
    return NextResponse.json(
        {
            title: completionSEO.choices[0].message.content,
        },
        { status: 200 },
    );
}
