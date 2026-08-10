import type { ReactNode } from "react";
import { cn } from "@/lib/utils/class";

interface TagProps {
	className?: string;
	children: ReactNode;
}

export default function Tag({ className, children }: TagProps) {
	return (
		<span
			className={cn(
				"px-2 py-1 bg-muted/50 border border-border text-xs text-muted-foreground",
				className,
			)}
		>
			{children}
		</span>
	);
}
