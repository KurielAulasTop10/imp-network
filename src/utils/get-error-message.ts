export function getErrorMessage(e: unknown) {
	if (e instanceof Error) {
		return e.message;
	}
		return "Unknown error";
}
