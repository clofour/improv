import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "./link";
import ExternalLink, { type LinkType } from "./link";
import { buttonVariants } from "./ui/button";

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface LinkButtonProps {
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
			className={cn(buttonVariants({ variant: variant, size: size }))}
			href={href}
		>
			{children}
		</Link>
	);
}
