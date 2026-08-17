"use client";

import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface AuthButtonProps {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
}

export default function AuthButton({ variant, size }: AuthButtonProps) {
	const [loading, setLoading] = useState(false);

	async function onClick() {
		setLoading(true);
		const { data, error } = await authClient.signIn.oauth2({
			providerId: "hackclub",
			callbackURL: "/app",
			scopes: ["openid", "email", "profile", "verification_status", "slack_id"],
		});
		setLoading(false);
	}

	return (
		<Button variant={variant} size={size} onClick={onClick}>
			{loading ? "Loading..." : "WIP"}
		</Button>
	);
}
