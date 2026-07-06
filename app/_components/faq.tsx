import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "./section";

export default function FAQ() {
	const items = [
		{
			id: "ysws",
			q: "What is a YSWS?",
			a: "YSWS stands for 'you ship, we ship'. You create and ship a project, then Hack Club ships you prizes.",
		},
		{
			id: "legitimacy",
			q: "Is this legit?",
			a: "Yup! We're Hack Club, a nonprofit organization that has been running similar programs for years.",
		},
		{
			id: "eligibility",
			q: "Am I eligible?",
			a: "You are eligible participate if you are between the ages of 13 to 18 inclusive.",
		},
		{
			id: "definition",
			q: "What counts as a project?",
			a: "Anything that provisions, configures, deploys, updates or secures infrastructure counts, as long as it works.",
		},
		{
			id: "capability",
			q: "What if I don't know how to code?",
			a: "That's completely fine! Hack Club is all about learning how to code. If you ever get stuck, you can ask for help.",
		},
	];

	return (
		<Section
			id="faq"
			title="frequently asked questions"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<Accordion defaultValue={["ysws"]}>
				{items.map((item) => (
					<AccordionItem key={item.id} value={item.id} className="panel px-3">
						<AccordionTrigger>{item.q}</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							{item.a}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</Section>
	);
}
