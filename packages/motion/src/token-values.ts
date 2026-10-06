export function durationInSeconds(value: string): number {
	const match = value.trim().match(/^(\d+(?:\.\d+)?)(ms|s)$/);
	return match ? Number(match[1]) / (match[2] === "ms" ? 1000 : 1) : 0;
}

export function parseEasing(value: string): [number, number, number, number] {
	const parts = value
		.trim()
		.match(/^cubic-bezier\(([^)]+)\)$/)?.[1]
		?.split(",")
		.map(Number);
	const [x1, y1, x2, y2] = parts ?? [];
	if (
		parts?.length === 4 &&
		parts.every(Number.isFinite) &&
		x1 !== undefined &&
		y1 !== undefined &&
		x2 !== undefined &&
		y2 !== undefined &&
		x1 >= 0 &&
		x1 <= 1 &&
		x2 >= 0 &&
		x2 <= 1
	) {
		return [x1, y1, x2, y2];
	}
	return [0, 0, 1, 1];
}
