"use client";

import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface HackatimeButtonProps {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
}

export default function HackatimeButton({
	variant,
	size,
}: HackatimeButtonProps) {
	async function onClick() {
		const { data, error } = await authClient.oauth2.link({
			providerId: "hackatime",
			callbackURL: "/app",
			scopes: ["profile", "read"],
		});
	}

	return (
		<Button variant={variant} size={size} onClick={onClick}>
			Link Hackatime
		</Button>
	);
}
