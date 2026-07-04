import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const items = [
    {
      id: "legitimacy",
      q: "Is this legit?",
      a: "Yup! We're Hack Club, a nonprofit organization that has been running similar programs for years."
    },
    {
      id: "eligibility",
      q: "Am I eligible?",
      a: "You can participate if you are between the ages of 13 to 18."
    },
    {
      id: "capability",
      q: "What if I don't know how to code?",
      a: "That's completely fine! Improv accomodates beginners..."
    },
  ]

  return (
    <Accordion defaultValue={["legitimacy"]}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}