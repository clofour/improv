import type { ReactNode } from "react";

interface SectionProps {
	id: string;
	title: string;
	description: ReactNode;
	children: ReactNode;
}

export default function Section({
	id,
	title,
	description,
	children,
}: SectionProps) {
	return (
		<div id={id} className="flex flex-col w-full h-full px-6 py-16 gap-6">
			<div className="flex flex-col gap-3">
				<div className="text-3xl sm:text-4xl font-heading font-bold">
					{title}
				</div>
				<div className="text-muted-foreground text-base font-mono">
					{description}
				</div>
			</div>

			<div>{children}</div>
		</div>
	);
}
