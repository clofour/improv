import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Panel from "./panel";

interface TerminalProps {
	className?: string;
	title: string;
	children: ReactNode;
}

export default function Terminal({
	title,
	className,
	children,
}: TerminalProps) {
	return (
		<Panel className={cn("flex flex-col overflow-hidden", className)}>
			<div className="flex shrink-0 justify-between items-center px-2 p-1 bg-muted/60 border-b border-border">
				<span className="text-muted-foreground uppercase">{title}</span>
				<div className="flex items-center gap-2">
					<div className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
					<div className="h-2.5 w-2.5 rounded-full bg-secondary/80" />
					<div className="h-2.5 w-2.5 rounded-full bg-primary/80" />
				</div>
			</div>
			<div className="min-h-0 w-full flex flex-1 flex-col p-2">{children}</div>
		</Panel>
	);
}
