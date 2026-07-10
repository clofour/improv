"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

interface Point {
	x: number;
	y: number;
}

interface Connection {
	from: string;
	to: string;
}

interface Wire {
	id: string;
	fromPosition: Point;
	toPosition: Point;
}

interface WiresProps {
	connections: Connection[];
	children: ReactNode;
}

const CABLE_COLORS = [
	"var(--red)",
	"var(--cyan)",
	"var(--green)",
	"var(--amber)",
];
const CABLE_THICKNESS = 10;
const CABLE_SPACING = 16;
const DEVIATION = 80;

const getEdgePosition = (
	element: HTMLElement,
	reference: HTMLElement,
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
	const dx = x2 - x1;
	const dy = y2 - y1;

	const deviation = dy * 0.75;

	const c1x = x1 + deviation;
	const c1y = y1;
	const c2x = x2 + deviation;
	const c2y = y2;

	const offset = (x2 - x1) * 0.5;
	return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

const RegisterPanelContext = createContext(null);

export function usePanelRef(id: string) {
	const registerPanel = useContext(RegisterPanelContext);

	return useCallback(
		(element) => {
			if (registerPanel) registerPanel(id, element);
		},
		[registerPanel, id],
	);
}

export function Wires({ connections, children }: WiresProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const panelRefs = useRef<Record<string, HTMLDivElement>>({});
	const [paths, setPaths] = useState<Wire[]>([]);

	const registerPanel = useCallback((id: string, element: HTMLDivElement) => {
		if (element) panelRefs.current[id] = element;
		else delete panelRefs.current[id];
	}, []);

	function updatePaths() {
		const container = containerRef.current;
		if (!container) return;

		setWidth(container.scrollWidth);
		setHeight(container.scrollHeight);

		const updatedPaths = connections
			.map((connection) => {
				const fromElement = panelRefs.current[connection.from];
				const toElement = panelRefs.current[connection.to];
				if (!fromElement || !toElement) return null;

				const fromPosition = getEdgePosition(fromElement, container, "right");
				const toPosition = getEdgePosition(toElement, container, "right");

				return {
					id: `${connection.from}-${connection.to}`,
					fromPosition,
					toPosition,
				};
			})
			.filter((path): path is Wire => path !== null);

		setPaths(updatedPaths);
	}

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		updatePaths();

		const observer = new ResizeObserver(updatePaths);
		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<RegisterPanelContext.Provider value={registerPanel}>
			<div
				ref={containerRef}
				className="relative w-full flex flex-col items-center"
			>
				<svg width={width} height={height} className="absolute inset-0">
					{paths.map((path) => (
						<Wiring
							key={path.id}
							fromPosition={path.fromPosition}
							toPosition={path.toPosition}
						/>
					))}
				</svg>
				{children}
			</div>
		</RegisterPanelContext.Provider>
	);
}

interface WiringProps {
	fromPosition: Point;
	toPosition: Point;
}

export function Wiring({ fromPosition, toPosition }: WiringProps) {
	return (
		<g>
			{CABLE_COLORS.map((color, i) => {
				const offset = (i - (CABLE_COLORS.length - 1) / 2) * CABLE_SPACING;
				const d = generateCurve(
					fromPosition.x,
					fromPosition.y + offset,
					toPosition.x,
					toPosition.y + offset,
				);

				return (
					<g key={color}>
						<path
							d={d}
							stroke={color}
							strokeWidth={CABLE_THICKNESS}
							strokeLinecap="round"
							fill="none"
							opacity={0.9}
						/>
						<path
							d={d}
							stroke="#fff"
							strokeWidth={CABLE_THICKNESS / 3}
							strokeLinecap="round"
							fill="none"
							opacity={0.3}
							transform="translate(-0.6, -0.6)"
						/>
					</g>
				);
			})}
		</g>
	);
}
