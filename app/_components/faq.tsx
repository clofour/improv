import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import NameSection from "./name-section";

export default function FAQ() {
	const items = [
		{
			id: "ysws",
			q: "what is a YSWS?",
			a: "YSWS stands for 'you ship, we ship'. you create and ship a project, then Hack Club ships you prizes.",
		},
		{
			id: "legitimacy",
			q: "is this legit?",
			a: "yup! we're Hack Club, a nonprofit organization that has been running similar programs for years.",
		},
		{
			id: "eligibility",
			q: "am I eligible?",
			a: "you are eligible to participate if you are between the ages of 13 to 18 inclusive.",
		},
		{
			id: "definition",
			q: "what counts as a project?",
			a: "anything that provisions, configures, deploys, updates or secures infrastructure counts, as long as it works.",
		},
		{
			id: "capability",
			q: "what if I don't know how to code?",
			a: "that's completely fine! Hack Club is all about learning how to code. if you ever get stuck, you can ask for help.",
		},
	];

	return (
		<NameSection
			id="faq"
			title="frequently asked questions"
			description="need i say more?"
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
		</NameSection>
	);
}
