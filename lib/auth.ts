import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { genericOAuth } from "better-auth/plugins/generic-oauth";

export const auth = betterAuth({
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: "hackclub",
					clientId: process.env.HACKCLUB_CLIENT_ID!,
					clientSecret: process.env.HACKCLUB_CLIENT_SECRET!,
					discoveryUrl:
						"https://auth.hackclub.com/.well-known/openid-configuration",
				},
			],
		}),
	],
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
});
