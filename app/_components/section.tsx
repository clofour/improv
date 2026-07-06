import type { ReactNode } from "react";

interface SectionProps {
	id?: string;
	children: ReactNode;
}

export default function Section({ id, children }: SectionProps) {
	return (
		<div id={id} className="flex flex-col w-full max-w-7xl h-full">
			{children}
		</div>
	);
}
