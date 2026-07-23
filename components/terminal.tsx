import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Panel from "./panel";

interface TerminalProps {
	className?: string;
	style?: {};
	title: string;
	children: ReactNode;
	onClose?: () => void;
	onMinimize?: () => void;
	onExpand?: () => void;
}

export default function Terminal({
	title,
	className,
	style,
	children,
	onClose,
	onMinimize,
	onExpand,
}: TerminalProps) {
	return (
		<Panel
			className={cn("min-w-40 flex flex-col overflow-hidden", className)}
			style={style}
		>
			<div className="flex shrink-0 justify-between items-center px-2 p-1 bg-muted/60 border-b border-border">
				<span className="text-muted-foreground uppercase">{title}</span>
				<div className="flex items-center gap-2">
					<div
						className="h-2.5 w-2.5 rounded-full bg-primary/80"
						onClick={onExpand}
					/>
					<div
						className="h-2.5 w-2.5 rounded-full bg-secondary/80"
						onClick={onMinimize}
					/>
					<div
						className="h-2.5 w-2.5 rounded-full bg-destructive/80"
						onClick={onClose}
					/>
				</div>
			</div>
			<div className="min-h-0 w-full flex flex-1 flex-col p-2">{children}</div>
		</Panel>
	);
}
