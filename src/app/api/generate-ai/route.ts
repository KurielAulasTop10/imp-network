import { createMigration, createWriteClient } from "@prismicio/client";
import { htmlAsRichText } from "@prismicio/migrate";
import { type NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import type { ChatCompletion } from "openai/resources/index";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    const { title, article, slug, SEOOnly } = await request.json();
    if (!title)
        return NextResponse.json({ message: "title is required" }, { status: 401 });
    if (!SEOOnly && !article)
        return NextResponse.json(
            { content: "article is required" },
            { status: 401 },
        );
    if (!slug)
        return NextResponse.json({ content: "slug is required" }, { status: 401 });
    const client = new OpenAI({
        baseURL: "https://api.electronhub.ai",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const completionSEO = await client.chat.completions.create({
        model: "gemini-2.5-flash-lite",
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

    let completionResume: ChatCompletion | undefined;
    if (!SEOOnly) {
        completionResume = await client.chat.completions.create({
            model: "gemini-2.5-flash-lite",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a concise news summarizer. Your task is to extract the key information from the provided news article and present it as a bulleted list (in HTML). Don't use the code block or ```html please. Focus on the most important facts, events, and conclusions. Do not include any introductory or concluding remarks, just the bullet points. Write only in Portuguese.",
                },
                {
                    role: "user",
                    content: article,
                },
            ],
        });
    }

    const prismicio = createWriteClient("imperio-network", {
        writeToken: process.env.PRISMIC_WRITE_TOKEN as string,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    });
    const migration = createMigration();
    const post = await prismicio.getByUID("post", slug);

    if (!SEOOnly && completionResume) {
        post.data.resume = htmlAsRichText(
            completionResume.choices[0].message.content as string,
        ).result;
    }

    post.data.seo_description = completionSEO.choices[0].message.content;
    migration.updateDocument(post);
    await prismicio.migrate(migration);
    return NextResponse.json({}, { status: 200 });
}
