import Terminal from "@/components/terminal";
import { ReactNode, useRef } from "react";
import { Vector2D, useDesktop, WindowStatus } from "./desktop";
import Panel from "@/components/panel";

interface WindowProps {
	id: string;
	name: string;
	children: ReactNode;
}

interface WindowResize {
	size: Vector2D;
	position: Vector2D;
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function isWindowVisible(status: WindowStatus) {
	if (status == WindowStatus.Open || status == WindowStatus.Fullscreen) {
		return true;
	}

	return false;
}

export default function Window({ id, name, children }: WindowProps) {
	const window = useDesktop((state) => state.windows[id]);
	const close = useDesktop((state) => state.close);
	const expand = useDesktop((state) => state.expand);
	const minimize = useDesktop((state) => state.minimize);
	const focus = useDesktop((state) => state.focus);
	const move = useDesktop((state) => state.move);
	const resize = useDesktop((state) => state.resize);

	const moveOffset = useRef<Vector2D | null>(null);
	const resizeOffset = useRef<WindowResize | null>(null);

	if (!window) return;

	const onMovePointerDown = (e: React.PointerEvent) => {
		if (e.target != e.currentTarget) return;

		focus(id);
		moveOffset.current = {
			x: e.clientX - window.position.x,
			y: e.clientY - window.position.y,
		};

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};
	const onMovePointerMove = (e: React.PointerEvent) => {
		if (!moveOffset.current) return;

		move(id, {
			x: e.clientX - moveOffset.current.x,
			y: e.clientY - moveOffset.current.y,
		});
	};
	const onMovePointerUp = (e: React.PointerEvent) => {
		moveOffset.current = null;
	};

	const onResizePointerDown = (e: React.PointerEvent) => {
		if (e.target != e.currentTarget) return;

		focus(id);
		resizeOffset.current = {
			size: {
				x: window.size.x,
				y: window.size.y,
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
			className="absolute min-w-40 flex flex-col overflow-hidden"
			style={{
				display: isWindowVisible(window.status) ? "flex" : "none",
				zIndex: window.zIndex,
				left: window.position.x,
				top: window.position.y,
				width:
					window.status == WindowStatus.Fullscreen ? "100%" : window.size.x,
				height:
					window.status == WindowStatus.Fullscreen ? "100%" : window.size.y,
			}}
		>
			<div
				className="flex shrink-0 justify-between items-center px-2 p-1 bg-muted/60 border-b border-border"
				onPointerDown={onMovePointerDown}
				onPointerMove={onMovePointerMove}
				onPointerUp={onMovePointerUp}
			>
				<span className="text-muted-foreground uppercase">{name}</span>
				<div className="flex items-center gap-2">
					<div
						className="h-2.5 w-2.5 rounded-full bg-primary/80"
						onClick={() => {
							expand(id);
						}}
					/>
					<div
						className="h-2.5 w-2.5 rounded-full bg-secondary/80"
						onClick={() => minimize(id)}
					/>
					<div
						className="h-2.5 w-2.5 rounded-full bg-destructive/80"
						onClick={() => close(id)}
					/>
				</div>
			</div>
			<div className="min-h-0 w-full flex flex-1 flex-col p-2">{children}</div>
			<div
				className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
				onPointerDown={onResizePointerDown}
				onPointerMove={onResizePointerMove}
				onPointerUp={onResizePointerUp}
			/>
		</Panel>
	);
}
