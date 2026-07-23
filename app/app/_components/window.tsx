import Terminal from "@/components/terminal";
import { ReactNode, useRef } from "react";
import { Position, useDesktop, WindowStatus } from "./desktop";
import Panel from "@/components/panel";

interface WindowProps {
	id: string;
	name: string;
	children: ReactNode;
}

export default function Window({ id, name, children }: WindowProps) {
	const window = useDesktop((state) => state.windows[id]);
	const close = useDesktop((state) => state.close);
	const minimize = useDesktop((state) => state.minimize);
	const focus = useDesktop((state) => state.focus);
	const move = useDesktop((state) => state.move);

	const dragOffset = useRef<Position | null>(null);

	if (!window) return;

	const onPointerDown = (e: React.PointerEvent) => {
		if (e.target != e.currentTarget) return;

		focus(id);
		dragOffset.current = {
			x: e.clientX - window.position.x,
			y: e.clientY - window.position.y,
		};

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.setPointerCapture(e.pointerId);
		}
	};

	const onPointerMove = (e: React.PointerEvent) => {
		if (!dragOffset.current) return;

		move(id, {
			x: e.clientX - dragOffset.current.x,
			y: e.clientY - dragOffset.current.y,
		});
	};

	const onPointerUp = (e: React.PointerEvent) => {
		dragOffset.current = null;
	};

	return (
		<Panel
			className="absolute min-w-40 flex flex-col overflow-hidden"
			style={{
				display: window.status == WindowStatus.Open ? "flex" : "none",
				zIndex: window.zIndex,
				left: window.position.x,
				top: window.position.y,
			}}
		>
			<div
				className="flex shrink-0 justify-between items-center px-2 p-1 bg-muted/60 border-b border-border"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
			>
				<span className="text-muted-foreground uppercase">{name}</span>
				<div className="flex items-center gap-2">
					<div className="h-2.5 w-2.5 rounded-full bg-primary/80" />
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
		</Panel>
	);
}
