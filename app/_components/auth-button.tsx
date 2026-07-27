"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { VariantProps } from "class-variance-authority";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface AuthButtonProps {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
}

export default function AuthButton({ variant, size }: AuthButtonProps) {
	async function onClick() {
		const { data, error } = await authClient.signIn.oauth2({
			providerId: "hackclub",
			callbackURL: "/app",
		});
	}

	return (
		<Button variant={variant} size={size} onClick={onClick}>
			Sign In
		</Button>
	);
}
