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
			id: "definition",
			q: "what does 'provisioning' mean?",
			a: "provisioning is the process of setting up the infrastructure necessary to run an aplication. concretely, this could be creating a server, installing software, configuring networking/storage and getting everything ready for the application to run.",
		},
		{
			id: "person-eligibility",
			q: "am I eligible?",
			a: "you are eligible to participate if you are between the ages of 13 to 18 inclusive.",
		},
		{
			id: "project-eligibility",
			q: "what counts as a project?",
			a: "even though the program focuses on container ochestrators, anything that provisions, configures, deploys, updates or secures infrastructure counts.",
		},
		{
			id: "capability",
			q: "what if I'm new to infrastructure?",
			a: "that's completely fine! you can use the guides or if you ever get stuck, you can ask for help.",
		},
		{
			id: "discounts",
			q: "how do discounts work?",
			a: "at review time, the reviewer assigns relevant tags to your project. you receive discount vouchers, which can only be used on items with the same tags as your project.",
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
