import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
	className?: string;
	children: ReactNode;
}

export default function Panel({ className, children, ...props }: PanelProps) {
	return (
		<div className={cn("panel", className)} {...props}>
			{children}
		</div>
	);
}
