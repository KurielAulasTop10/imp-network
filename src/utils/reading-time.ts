import type { RichTextField } from "@prismicio/client";
import { asText } from "@prismicio/client";

export function calculateReadingTime(field: RichTextField): number {
	const text = asText(field);
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}
