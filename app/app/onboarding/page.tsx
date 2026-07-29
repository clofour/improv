"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Onboarding() {
	async function onClick() {
		const { data, error } = await authClient.oauth2.link({
			providerId: "hackatime",
			callbackURL: "/app",
			scopes: ["profile", "read"],
		});
	}

	return (
		<Button variant="ghost" size="sm" onClick={onClick}>
			Link Hackatime
		</Button>
	);
}
