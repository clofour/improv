import { LinkType } from "@/components/link";
import LinkButton, { type LinkButtonProps } from "@/components/link-button";

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
