import type { ReactNode } from "react";
import Section from "./section";

interface NameSection {
	id: string;
	title: string;
	description?: ReactNode;
	aside?: "left" | "right";
	children: ReactNode;
}

export default function NameSection({
	id,
	title,
	description,
	aside,
	children,
}: NameSection) {
	const titleElement = (
		<h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
			{title}
		</h2>
	);
	const descriptionElement = description && (
		<div className="max-w-2xl text-muted-foreground text-lg">{description}</div>
	);

	return (
		<div className="w-full flex justify-center border-t border-border">
			<Section id={id}>
				{aside ? (
					<div
						className={`grid grid-cols-1 ${aside === "right" ? "lg:grid-cols-[2fr_1fr]" : "lg:grid-cols-[1fr_2fr]"} px-6 py-20 sm:py-24 gap-10 lg:gap-16`}
					>
						<div
							className={`flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start ${aside === "right" ? "lg:order-last lg:items-end lg:text-right" : ""}`}
						>
							{titleElement}
							{descriptionElement}
						</div>
						<div>{children}</div>
					</div>
				) : (
					<div className="flex flex-col px-6 py-20 sm:py-24 gap-10">
						<div className="flex flex-col gap-4">
							{titleElement}
							{descriptionElement}
						</div>
						<div>{children}</div>
					</div>
				)}
			</Section>
		</div>
	);
}
