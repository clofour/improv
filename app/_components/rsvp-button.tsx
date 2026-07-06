import ExternalLink, { LinkType } from "@/components/link";
import LinkButton, { LinkButtonProps } from "@/components/link-button";
import { buttonVariants } from "@/components/ui/button";

interface RSVPButtonProps {
	variant?: LinkButtonProps["variant"];
	size?: LinkButtonProps["size"];
}

export default function RSVPButton({ size, variant }: RSVPButtonProps) {
	return (
		<LinkButton
			type={LinkType.External}
			variant={variant}
			size={size}
			href="https://rsvp.hackclub.community/improv"
		>
			RSVP
		</LinkButton>
	);
}
