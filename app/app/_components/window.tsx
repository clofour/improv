import Terminal from "@/components/terminal";
import { ReactNode, useRef } from "react";
import { useDesktop, WindowStatus } from "./desktop";
import Panel from "@/components/panel";
import { clamp } from "@/lib/utils";
import { Vector2D } from "@/lib/2d";
import { useMediaQuery } from "react-responsive";

interface WindowProps {
	screenRef: React.RefObject<HTMLDivElement | null>;
	id: string;
	name: string;
	children: ReactNode;
}

interface WindowResize {
	size: Vector2D;
	position: Vector2D;
}

export function clampWindowPosition(
	position: Vector2D,
	window: HTMLElement,
	container: HTMLElement,
) {
	const windowRect = window.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return {
		x: clamp(position.x, 0, containerRect.width - windowRect.width),
		y: clamp(position.y, 0, containerRect.height - windowRect.height),
	};
}

function isWindowVisible(status: WindowStatus) {
	if (status == WindowStatus.Open || status == WindowStatus.Fullscreen) {
		return true;
	}

	return false;
}

export default function Window({ screenRef, id, name, children }: WindowProps) {
	const item = useDesktop((state) => state.items[id]);
	const close = useDesktop((state) => state.closeWindow);
	const expand = useDesktop((state) => state.expandWindow);
	const minimize = useDesktop((state) => state.minimizeWindow);
	const focus = useDesktop((state) => state.focusWindow);
	const move = useDesktop((state) => state.moveWindow);
	const resize = useDesktop((state) => state.resizeWindow);

	const moveOffset = useRef<Vector2D | null>(null);
	const windowRef = useRef<HTMLDivElement | null>(null);
	const resizeOffset = useRef<WindowResize | null>(null);

	if (!item) return;
	const itemWindow = item.window;

	const onMovePointerDown = (e: React.PointerEvent) => {
		if (e.target != e.currentTarget) return;

		focus(id);
		moveOffset.current = {
			x: e.clientX - itemWindow.position.x,
			y: e.clientY - itemWindow.position.y,
		};

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};
	const onMovePointerMove = (e: React.PointerEvent) => {
		if (!moveOffset.current || !windowRef.current || !screenRef.current) return;

		move(
			id,
			clampWindowPosition(
				{
					x: e.clientX - moveOffset.current.x,
					y: e.clientY - moveOffset.current.y,
				},
				windowRef.current,
				screenRef.current,
			),
		);
	};
	const onMovePointerUp = (e: React.PointerEvent) => {
		moveOffset.current = null;
	};

	const onResizePointerDown = (e: React.PointerEvent) => {
		if (e.target != e.currentTarget) return;

		focus(id);
		resizeOffset.current = {
			size: {
				x: itemWindow.size.x,
				y: itemWindow.size.y,
			},
			position: {
				x: e.clientX,
				y: e.clientY,
			},
		};

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};
	const onResizePointerMove = (e: React.PointerEvent) => {
		if (!resizeOffset.current) return;

		const resizeOperation = resizeOffset.current;

		const dx = resizeOperation.position.x - e.clientX;
		const dy = resizeOperation.position.y - e.clientY;

		resize(id, {
			x: clamp(resizeOperation.size.x - dx, 100, 1000),
			y: clamp(resizeOperation.size.y - dy, 100, 1000),
		});
	};
	const onResizePointerUp = (e: React.PointerEvent) => {
		resizeOffset.current = null;
	};

	return (
		<Panel
			ref={windowRef}
			className="absolute min-w-40 flex flex-col overflow-hidden"
			style={{
				display: isWindowVisible(itemWindow.status) ? "flex" : "none",
				zIndex: itemWindow.zIndex,
				left: itemWindow.position.x,
				top: itemWindow.position.y,
				width:
					itemWindow.status == WindowStatus.Fullscreen
						? "100%"
						: itemWindow.size.x,
				height:
					itemWindow.status == WindowStatus.Fullscreen
						? "100%"
						: itemWindow.size.y,
			}}
		>
			<div
				className="flex shrink-0 justify-between items-center px-2 p-1 bg-muted/60 border-b border-border"
				onPointerDown={onMovePointerDown}
				onPointerMove={onMovePointerMove}
				onPointerUp={onMovePointerUp}
			>
				<span className="text-muted-foreground uppercase select-none pointer-events-none">
					{name}
				</span>
				<div className="flex items-center gap-2">
					<div
						className="w-5 h-5 sm:w-2.5 sm:h-2.5 rounded-full bg-primary/80"
						onClick={() => {
							expand(id);
						}}
					/>
					<div
						className="w-5 h-5 sm:w-2.5 sm:h-2.5 rounded-full bg-secondary/80"
						onClick={() => minimize(id)}
					/>
					<div
						className="w-5 h-5 sm:w-2.5 sm:h-2.5 rounded-full bg-destructive/80"
						onClick={() => close(id)}
					/>
				</div>
			</div>
			<div className="min-h-0 w-full flex flex-1 flex-col p-2">{children}</div>
			<div
				className="absolute bottom-0 right-0 hidden sm:block w-3 h-3 cursor-nwse-resize"
				onPointerDown={onResizePointerDown}
				onPointerMove={onResizePointerMove}
				onPointerUp={onResizePointerUp}
			/>
		</Panel>
	);
}
