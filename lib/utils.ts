export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}
