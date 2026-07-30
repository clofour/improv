import { useRef } from "react";
import { useDesktop, Vector2D } from "./desktop";

export default function Background() {
	const selectFiles = useDesktop((state) => state.selectFiles);

	function onClick() {
		selectFiles([]);
	}

	return (
		<div className="absolute inset-0" onClick={onClick}>
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
