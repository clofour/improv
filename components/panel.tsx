import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
	ref?: React.Ref<HTMLDivElement>;
	className?: string;
	children: ReactNode;
}

export default function Panel({
	ref,
	className,
	children,
	...props
}: PanelProps) {
	return (
		<div ref={ref} className={cn("panel", className)} {...props}>
			{children}
		</div>
	);
}
