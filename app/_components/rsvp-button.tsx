import ExternalLink, { LinkType } from "@/components/link";
import LinkButton from "@/components/link-button";
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
		<LinkButton
			type={LinkType.External}
			variant="default"
			size={size}
			href="https://rsvp.hackclub.community/improv"
		>
			RSVP
		</LinkButton>
	);
}
