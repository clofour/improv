"use client";

import { useRef } from "react";
import { useDesktop, Vector2D } from "./desktop";
import Image from "next/image";

const GRID_SIZE = 50;

interface FileProps {
	id: string;
}

export default function File({ id }: FileProps) {
	const item = useDesktop((state) => state.items[id]);
	const openWindow = useDesktop((state) => state.openWindow);
	const moveFile = useDesktop((state) => state.moveFile);

	const moveOffset = useRef<Vector2D | null>(null);

	if (!item) return;
	const file = item.file;

	const onMovePointerDown = (e: React.PointerEvent) => {
		moveOffset.current = {
			x: e.clientX - file.position.x,
			y: e.clientY - file.position.y,
		};

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};
	const onMovePointerMove = (e: React.PointerEvent) => {
		if (!moveOffset.current) return;

		moveFile(id, {
			x: e.clientX - moveOffset.current.x,
			y: e.clientY - moveOffset.current.y,
		});
	};
	const onMovePointerUp = (e: React.PointerEvent) => {
		if (!moveOffset.current) return;

		const x = e.clientX - moveOffset.current.x;
		const y = e.clientY - moveOffset.current.y;
		moveFile(id, {
			x: Math.round(x / GRID_SIZE) * GRID_SIZE,
			y: Math.round(y / GRID_SIZE) * GRID_SIZE,
		});

		moveOffset.current = null;
	};

	return (
		<>
			<button
				className="absolute flex flex-col p-2 gap-2"
				// onClick={() => openWindow(id)}
				onPointerDown={onMovePointerDown}
				onPointerMove={onMovePointerMove}
				onPointerUp={onMovePointerUp}
				style={{
					left: file.position.x,
					top: file.position.y,
				}}
			>
				<div className="flex justify-center align-center">
					<Image
						src={item.logo}
						alt={item.name}
						width={40}
						height={40}
						draggable={false}
					/>
				</div>
				<span className="text-xs">{item.name}</span>
			</button>
		</>
	);
}
