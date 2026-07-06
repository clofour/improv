"use client";

import Terminal from "@/components/terminal";
import Section from "./section";
import Panel from "@/components/panel";
import { useEffect, useRef, useState } from "react";

interface Step {
	id: string;
	title: string;
	description: string;
	links: string[];
}

interface Path {
	id: string;
	d: string;
}

interface Point {
	x: number;
	y: number;
}

const columns = [
	[
		{
			id: "need",
			title: "Identify a real need",
			description: "IDK",
			links: ["existing", "new"],
		},
	],
	[
		{
			id: "existing",
			title: "Use existing provisioning tools",
			description: "IDK",
			links: ["ship"],
		},
		{
			id: "new",
			title: "Create your own provisioning tools",
			description: "IDK",
			links: ["ship"],
		},
	],
	[
		{
			id: "ship",
			title: "Ship a working project",
			description: "IDK",
			links: ["uptime"],
		},
	],
	[
		{
			id: "uptime",
			title: "Receive Uptime",
			description: "IDK",
			links: ["shop"],
		},
	],
	[
		{
			id: "shop",
			title: "Redeem prizes from the shop",
			description: "IDK",
			links: [],
		},
	],
];
const flatColumns = columns.flat();

const getEdgePosition = (
	element: HTMLElement,
	reference: SVGSVGElement,
	side: "left" | "right",
): Point => {
	const elementBounds = element.getBoundingClientRect();
	const referenceBounds = reference.getBoundingClientRect();

	return {
		x: elementBounds[side] - referenceBounds.left,
		y: elementBounds.top + elementBounds.height / 2 - referenceBounds.top,
	};
};

function generateCurve(x1: number, y1: number, x2: number, y2: number) {
	const offset = (x2 - x1) * 0.5;
	return `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
}

export default function Flow() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const [paths, setPaths] = useState<Path[]>([]);

	useEffect(() => {
		let animationFrame = 0;

		const container = containerRef.current;
		const svg = svgRef.current;
		if (!container || !svg) return;

		const updatePaths = () => {
			const updatedPaths = [];

			for (const column of columns) {
				for (const step of column) {
					const fromNode = nodeRefs.current[step.id];
					if (!fromNode) continue;
					const fromNodePos = getEdgePosition(fromNode, svg, "right");

					for (const nextStepId of step.links) {
						const toNode = nodeRefs.current[nextStepId];
						if (!toNode) continue;
						const toNodePos = getEdgePosition(toNode, svg, "left");

						updatedPaths.push({
							id: `${step.id}-${nextStepId}`,
							d: generateCurve(
								fromNodePos.x,
								fromNodePos.y,
								toNodePos.x,
								toNodePos.y,
							),
						});
					}
				}
			}

			setPaths(updatedPaths);
			console.log(updatedPaths);
		};

		const scheduleUpdate = () => {
			cancelAnimationFrame(animationFrame);
			animationFrame = requestAnimationFrame(updatePaths);
		};

		const observer = new ResizeObserver(scheduleUpdate);
		observer.observe(container);

		scheduleUpdate();

		return () => {
			cancelAnimationFrame(animationFrame);
			observer.disconnect();
		};
	}, []);

	return (
		<Section
			id="how"
			title="how it works"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<Terminal title="architecture diagram" className="w-full h-full">
				<div className="sm:hidden flex flex-col px-4 py-2">
					{flatColumns.map((step, index, steps) => (
						<div key={step.id} className="flex flex-row gap-4">
							<div className="flex flex-col items-center">
								<div className="size-8 flex items-center justify-center border border-primary bg-primary/10 text-sm text-primary">
									{index + 1}
								</div>
								{index < steps.length - 1 ? (
									<div className="w-px h-full min-h-8 bg-gradient-to-b from-border to-transparent/25" />
								) : null}
							</div>
							<div>
								<p className="text-base font-heading font-bold leading-none">
									{step.title}
								</p>
								<p className="text-sm text-muted-foreground">
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="hidden sm:block">
					<div className="w-full h-full px-5 py-10 overflow-x-auto">
						<div ref={containerRef} className="w-max h-full relative">
							<svg
								ref={svgRef}
								className="w-full h-full absolute inset-0 pointer-events-none"
							>
								<defs>
									<marker
										id="arrow"
										viewBox="0 0 10 10"
										refX="9"
										refY="5"
										markerWidth="6"
										markerHeight="6"
										orient="auto-start-reverse"
									>
										<path d="M0,0 L10,5 L0,10 z" fill="var(--color-wire)" />
									</marker>
								</defs>

								{paths.map((path) => (
									<path
										key={path.id}
										d={path.d}
										className="wire-flow"
										stroke="var(--color-wire)"
										strokeWidth="2"
										fill="none"
										markerEnd="url(#arrow)"
									/>
								))}
							</svg>

							<div className="w-max h-full flex flex-row gap-14">
								{columns.map((column, columnIndex) => (
									<div
										key={columnIndex}
										className="w-full h-full flex flex-col justify-between gap-10"
									>
										{column.map((step) => (
											<Panel
												key={step.id}
												ref={(element) => {
													nodeRefs.current[step.id] = element;
												}}
												className="px-3 py-2 mx-auto"
											>
												<p className="text-sm font-heading font-bold">
													{step.title}
												</p>
												<p className="text-xs text-muted-foreground">
													{step.description}
												</p>
											</Panel>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Terminal>
		</Section>
	);
}
