import { ReactNode } from "react";
import Section from "./section";

interface NameSection {
	id: string;
	title: string;
	description: ReactNode;
	children: ReactNode;
}

export default function NameSection({
	id,
	title,
	description,
	children,
}: NameSection) {
	return (
		<Section id={id}>
			<div className="flex flex-col px-6 py-14 gap-6">
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
		</Section>
	);
}
