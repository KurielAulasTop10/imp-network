export function cdn(url: string, width: number, height: number) {
	const urlObj = new URL(url);
	const newUrl = `https://wsrv.nl/?url=${encodeURIComponent(`${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`)}&ll&output=webp&w=${width}&h=${height}&q=70&fit=cover`;
	return newUrl;
}
