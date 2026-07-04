import { ReactNode } from "react";
import Panel from "./panel";

interface TerminalProps {
    title: string;
    children: ReactNode;
}

export default function Terminal({ title, children }: TerminalProps) {
    return (
        <Panel>
            <div>
                <span className="text-muted-foreground uppercase">{title}</span>
                <div>
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                </div>
            </div>
            {children}
        </Panel>
    )
}