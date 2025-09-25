import { asText } from "@prismicio/client";

export function calculateReadingTime(content: any): number {
  const text = asText(content) || "";
  const wordsPerMinute = 181;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime;
}
