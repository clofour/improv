import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PanelProps {
    className?: string;
    children: ReactNode;
}

export default function Panel({ className, children, ...props }: PanelProps) {
    return (
        <div className={cn("utility", className)} {...props}>
            {children}
        </div>
    )
}