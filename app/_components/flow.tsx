import Terminal from "@/components/terminal";
import Section from "./section";

export default function Flow() {
	return (
		<Section
			id="how"
			title="how it works"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<Terminal title="architecture" className="w-full h-full">
				Hello!
			</Terminal>
		</Section>
	);
}
