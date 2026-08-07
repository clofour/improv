"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getRelativeMousePosition, type Vector2D } from "@/lib/2d";
import { clamp } from "@/lib/utils";
import { useDesktop } from "./desktop";

interface FileProps {
	id: string;
	screenRef: React.RefObject<HTMLDivElement | null>;
	isMobile: boolean;
}

export const COL_SIZE = 70;
export const ROW_SIZE = 70;

export default function File({ id, screenRef, isMobile }: FileProps) {
	const item = useDesktop((state) => state.items[id]);
	const selectedFileIDs = useDesktop((state) => state.selectedFiles);
	const openWindow = useDesktop((state) => state.openWindow);
	const moveFile = useDesktop((state) => state.moveFile);
	const selectFiles = useDesktop((state) => state.selectFiles);

	const fileRef = useRef<HTMLButtonElement | null>(null);

	const moveOffset = useRef<Vector2D | null>(null);
	const [dragPosition, setDragPosition] = useState<Vector2D | null>(null);

	if (!item) return;

	const file = item.file;
	const isSelected = selectedFileIDs.includes(id);

	const isDragging = dragPosition !== null;
	const style: React.CSSProperties = isDragging
		? {
				position: "absolute",
				left: dragPosition?.x,
				top: dragPosition?.y,
				width: COL_SIZE,
				height: ROW_SIZE,
			}
		: {
				gridColumn: file.location.x + 1,
				gridRow: file.location.y + 1,
				width: "100%",
				height: "100%",
			};

	const onMovePointerDown = (e: React.PointerEvent) => {
		if (!screenRef.current || !fileRef.current) return;

		const screenElement = screenRef.current;
		const fileElement = fileRef.current;
		const screenRect = screenElement.getBoundingClientRect();
		const fileRect = fileElement.getBoundingClientRect();

		const relative = getRelativeMousePosition(screenElement, {
			x: e.clientX,
			y: e.clientY,
		});

		const filePosition = {
			x: fileRect.left - screenRect.left,
			y: fileRect.top - screenRect.top,
		};

		moveOffset.current = {
			x: relative.x - filePosition.x,
			y: relative.y - filePosition.y,
		};

		setDragPosition(filePosition);

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};
	const onMovePointerMove = (e: React.PointerEvent) => {
		if (!fileRef.current || !screenRef.current || !moveOffset.current) return;

		const screenElement = screenRef.current;
		const fileElement = fileRef.current;
		const screenRect = screenElement.getBoundingClientRect();
		const fileRect = fileElement.getBoundingClientRect();

		const relative = getRelativeMousePosition(screenElement, {
			x: e.clientX,
			y: e.clientY,
		});

		setDragPosition({
			x: clamp(
				relative.x - moveOffset.current.x,
				0,
				screenRect.width - fileRect.width,
			),
			y: clamp(
				relative.y - moveOffset.current.y,
				0,
				screenRect.height - fileRect.height,
			),
		});
	};
	const onMovePointerUp = (e: React.PointerEvent) => {
		if (!screenRef.current || !moveOffset.current) return;

		const screenElement = screenRef.current;
		const screenRect = screenElement.getBoundingClientRect();

		const relative = getRelativeMousePosition(screenElement, {
			x: e.clientX,
			y: e.clientY,
		});

		const x = relative.x - moveOffset.current.x;
		const y = relative.y - moveOffset.current.y;

		const col = Math.round(x / COL_SIZE);
		const row = Math.round(y / ROW_SIZE);
		const maxCol = Math.floor(screenRect.width / COL_SIZE) - 1;
		const maxRow = Math.floor(screenRect.height / ROW_SIZE) - 1;

		moveFile(id, {
			x: clamp(col, 0, maxCol),
			y: clamp(row, 0, maxRow),
		});

		moveOffset.current = null;
		setDragPosition(null);
	};

	return (
		<button
			ref={fileRef}
			type="button"
			className={`flex flex-col px-2.5 py-2 gap-2 ${isSelected ? "bg-blue-500/20 border border-blue-500/50" : ""}`}
			onClick={() => selectFiles([id])}
			onDoubleClick={() => openWindow(id, isMobile)}
			onPointerDown={onMovePointerDown}
			onPointerMove={onMovePointerMove}
			onPointerUp={onMovePointerUp}
			style={style}
		>
			<div className="flex justify-center align-center">
				<Image
					src={item.logo}
					alt={item.name}
					width={35}
					height={35}
					draggable={false}
				/>
			</div>
			<span className="text-xs">{item.name}</span>
		</button>
	);
}
