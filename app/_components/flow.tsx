import Terminal from "@/components/terminal";
import Section from "./section";

export default function Flow() {
	const columns = [
		["Come up with an awesome idea!!"],
		["Use existing provisioning tools", "Create your own provisioning tools"],
		["Ship your project"],
		["Receive Uptime"],
		["Buy prizes from the shop"],
	];

	function generateCurve(x1: number, y1: number, x2: number, y2: number) {
		const offset = (x2 - x1) * 0.5;
		return `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
	}

	return (
		<Section
			id="how"
			title="how it works"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<Terminal title="architecture" className="w-full h-full">
				<div className="w-full h-full relative px-5 py-10 overflow-x-auto">
					<svg className="w-full h-full absolute inset-0 pointer-events-none"></svg>
					<div className="w-max h-full flex flex-row gap-30">
						{columns.map((column) => (
							<div className="w-full h-full flex flex-col justify-between gap-10">
								{column.map((step) => (
									<div className="mx-auto">{step}</div>
								))}
							</div>
						))}
					</div>
				</div>
			</Terminal>
		</Section>
	);
}
