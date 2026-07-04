import { ReactNode } from "react";
import Panel from "./panel";

interface TerminalProps {
    className?: string;
    title: string;
    children: ReactNode;
}

export default function Terminal({ title, className, children }: TerminalProps) {
    return (
        <Panel className={className}>
            <div className="flex justify-between items-center px-2 p-1 border-b border-border">
                <span className="text-muted-foreground uppercase">{title}</span>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive/80" />
                    <div className="h-2 w-2 rounded-full bg-secondary/80" />
                    <div className="h-2 w-2 rounded-full bg-primary/80" />
                </div>
            </div>
            <div className="p-2">
                {children}
            </div>
        </Panel>
    )
}