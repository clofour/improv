export type Vector2D = { x: number; y: number };

export function getRelativeMousePosition(
	reference: HTMLElement,
	absolutePosition: Vector2D,
) {
	const rect = reference.getBoundingClientRect();

	return {
		x: absolutePosition.x - rect.left,
		y: absolutePosition.y - rect.top,
	};
}
