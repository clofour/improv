import { useRef } from "react";
import { useDesktop, Vector2D } from "./desktop";

export default function Background() {
	const selectFiles = useDesktop((state) => state.selectFiles);

	// const selectOffset = useRef<Vector2D | null>(null);

	function onClick() {
		selectFiles([]);
	}

	// const onPointerDown = (e: React.PointerEvent) => {
	// 	if (e.target != e.currentTarget) return;

	// 	selectOffset.current = {
	// 		x: e.clientX - file.position.x,
	// 		y: e.clientY - file.position.y,
	// 	};

	// 	selectFiles([]);
	// };
	// const onPointerMove = (e: React.PointerEvent) => {
	// 	if (!selectOffset.current) return;

	// 	const clampX = clamp(e.clientX, 0, window.innerWidth);
	// 	const clampY = clamp(e.clientY, 0, window.innerHeight);

	// 	moveFile(id, {
	// 		x: clampX - selectOffset.current.x,
	// 		y: clampY - selectOffset.current.y,
	// 	});
	// };
	// const onPointerUp = (e: React.PointerEvent) => {
	// 	selectOffset.current = null;
	// };

	return (
		<div
			className="absolute inset-0"
			onClick={onClick}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
		>
			<div
				className="absolute bg-blue-600 border border-blue-600"
				style={{
					left: 1,
					top: 1,
					width: 1,
					height: 1,
				}}
			/>
		</div>
	);
}
