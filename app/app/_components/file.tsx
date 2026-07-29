"use client";

import { useRef } from "react";
import { useDesktop, Vector2D } from "./desktop";
import Image from "next/image";
import { clamp } from "@/lib/utils";

const GRID_SIZE = 50;

interface FileProps {
	id: string;
}

export default function File({ id }: FileProps) {
	const item = useDesktop((state) => state.items[id]);
	const openWindow = useDesktop((state) => state.openWindow);
	const moveFile = useDesktop((state) => state.moveFile);
	const selectFiles = useDesktop((state) => state.selectFiles);

	const selectedFileIDs = useDesktop((state) => state.selectedFiles);
	const isSelected = selectedFileIDs.includes(id);

	console.log(selectedFileIDs, isSelected, id);

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

		const clampX = clamp(e.clientX, 0, window.innerWidth);
		const clampY = clamp(e.clientY, 0, window.innerHeight);

		moveFile(id, {
			x: clampX - moveOffset.current.x,
			y: clampY - moveOffset.current.y,
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
				className={`absolute flex flex-col px-2.5 py-2 gap-2 ${isSelected ? "bg-blue-500/20 border border-blue-500/50" : ""}`}
				onClick={() => selectFiles([id])}
				onDoubleClick={() => openWindow(id)}
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
