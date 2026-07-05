"use client";

import Terminal from "@/components/terminal";
import Section from "./section";
import Panel from "@/components/panel";
import { useEffect, useRef, useState } from "react";

interface Path {
	d: string;
}

interface Point {
	x: number;
	y: number;
}

export default function Flow() {
	const columns = [
		["Come up with an awesome idea!!"],
		["Use existing provisioning tools", "Create your own provisioning tools"],
		["Ship your project"],
		["Receive Uptime"],
		["Buy prizes from the shop"],
	];
	const svgRef = useRef<SVGSVGElement | null>(null);
	const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const [paths, setPaths] = useState<Path[]>([]);

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

	useEffect(() => {
		console.log(nodeRefs.current);
		console.log(svgRef.current?.getBoundingClientRect());

		const updatedPaths = [];

		const svg = svgRef.current;
		if (!svg) return;

		for (let col = 0; col < columns.length - 1; col++) {
			for (let row = 0; row < columns[col].length; row++) {
				const fromNode = nodeRefs.current[`${col}-${row}`];
				if (!fromNode) continue;
				const fromNodePos = getEdgePosition(fromNode, svg, "right");

				for (let nextRow = 0; nextRow < columns[col + 1].length; nextRow++) {
					const toNode = nodeRefs.current[`${col + 1}-${nextRow}`];
					if (!toNode) continue;
					const toNodePos = getEdgePosition(toNode, svg, "left");

					updatedPaths.push({
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

		console.log(updatedPaths);
		setPaths(updatedPaths);
	}, []);

	return (
		<Section
			id="how"
			title="how it works"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<Terminal title="architecture" className="w-full h-full">
				<div className="w-full h-full px-5 py-10 overflow-x-auto">
					<div className="w-max h-full relative">
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

							{paths.map((path, index) => (
								<path
									key={index}
									d={path.d}
									className="wire-flow"
									stroke="var(--color-wire)"
									strokeWidth="2"
									fill="none"
									markerEnd="url(#arrow)"
								/>
							))}
						</svg>

						<div className="w-max h-full flex flex-row gap-20">
							{columns.map((column, columnIndex) => (
								<div className="w-full h-full flex flex-col justify-between gap-10">
									{column.map((step, rowIndex) => (
										<Panel
											ref={(element) => {
												nodeRefs.current[`${columnIndex}-${rowIndex}`] =
													element;
											}}
											className="px-3 py-2 mx-auto"
										>
											{step}
										</Panel>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</Terminal>
		</Section>
	);
}
