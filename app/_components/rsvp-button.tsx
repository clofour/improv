import ExternalLink from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";

interface RSVPButtonProps {
	size:
		| "lg"
		| "default"
		| "xs"
		| "sm"
		| "icon"
		| "icon-xs"
		| "icon-sm"
		| "icon-lg"
		| null
		| undefined;
}

export default function RSVPButton({ size }: RSVPButtonProps) {
	return (
		<ExternalLink
			className={buttonVariants({ variant: "default", size: size })}
			href="https://rsvp.hackclub.community/improv"
		>
			RSVP
		</ExternalLink>
	);
}
