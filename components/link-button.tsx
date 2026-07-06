import { ReactNode } from "react";
import ExternalLink, { LinkType } from "./link";
import { buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import Link from "./link";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface LinkButtonProps {
	type: LinkType;
	variant?: ButtonVariants["variant"];
	size: ButtonVariants["size"];
	href: string;
	children: ReactNode;
}

export default function LinkButton({
	type,
	variant,
	size,
	href,
	children,
}: LinkButtonProps) {
	return (
		<Link
			type={type}
			className={buttonVariants({ variant: variant, size: size })}
			href={href}
		>
			{children}
		</Link>
	);
}
