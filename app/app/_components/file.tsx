"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useDesktop } from "./desktop";
import Image from "next/image";
import { clamp } from "@/lib/utils";
import { getRelativeMousePosition, Vector2D } from "@/lib/2d";

const GRID_SIZE = 50;
const MARGIN_SIZE = 10;

interface FileProps {
	screenRef: React.RefObject<HTMLDivElement | null>;
	id: string;
	initLocation: Vector2D;
}

export function alignToGrid(axis: number) {
	return Math.round(axis / GRID_SIZE) * GRID_SIZE;
}

export function locationToPosition(location: Vector2D) {
	return {
		x: location.x * GRID_SIZE,
		y: location.y * GRID_SIZE,
	};
}

export function clampFilePosition(
	position: Vector2D,
	file: HTMLElement,
	container: HTMLElement,
) {
	const fileRect = file.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return {
		x: clamp(
			alignToGrid(position.x),
			MARGIN_SIZE,
			containerRect.width - fileRect.width - MARGIN_SIZE,
		),
		y: clamp(
			alignToGrid(position.y),
			MARGIN_SIZE,
			containerRect.height - fileRect.height - MARGIN_SIZE,
		),
	};
}

export default function File({ screenRef, id, initLocation }: FileProps) {
	const item = useDesktop((state) => state.items[id]);
	const openWindow = useDesktop((state) => state.openWindow);
	const moveFile = useDesktop((state) => state.moveFile);
	const selectFiles = useDesktop((state) => state.selectFiles);

	const selectedFileIDs = useDesktop((state) => state.selectedFiles);
	const isSelected = selectedFileIDs.includes(id);

	const initialized = useRef<boolean>(false);
	const fileRef = useRef<HTMLButtonElement | null>(null);
	const moveOffset = useRef<Vector2D | null>(null);

	useLayoutEffect(() => {
		if (initialized.current || !fileRef.current || !screenRef.current) return;

		initialized.current = true;

		moveFile(
			id,
			clampFilePosition(
				locationToPosition(initLocation),
				fileRef.current,
				screenRef.current,
			),
		);
	}, [item, id, initLocation, moveFile, fileRef, screenRef]);

	if (!item) return;
	const file = item.file;

	const onMovePointerDown = (e: React.PointerEvent) => {
		if (!screenRef.current) return;
		const screenElement = screenRef.current;

		const relative = getRelativeMousePosition(screenElement, {
			x: e.clientX,
			y: e.clientY,
		});

		moveOffset.current = {
			x: relative.x - file.position.x,
			y: relative.y - file.position.y,
		};

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};
	const onMovePointerMove = (e: React.PointerEvent) => {
		if (!fileRef.current || !screenRef.current || !moveOffset.current) return;

		const fileElement = fileRef.current;
		const screenElement = screenRef.current;

		const relative = getRelativeMousePosition(screenElement, {
			x: e.clientX,
			y: e.clientY,
		});

		const screenRect = screenElement.getBoundingClientRect();
		const fileRect = fileElement.getBoundingClientRect();

		moveFile(id, {
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
		if (!fileRef.current || !screenRef.current || !moveOffset.current) return;

		const fileElement = fileRef.current;
		const screenElement = screenRef.current;

		const relative = getRelativeMousePosition(screenElement, {
			x: e.clientX,
			y: e.clientY,
		});

		const x = relative.x - moveOffset.current.x;
		const y = relative.y - moveOffset.current.y;
		const position = clampFilePosition(
			{ x: x, y: y },
			fileElement,
			screenElement,
		);
		moveFile(id, position);

		moveOffset.current = null;
	};

	return (
		<>
			<button
				ref={fileRef}
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
