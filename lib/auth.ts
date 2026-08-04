import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import * as authSchema from "./db/auth-schema";

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
				{
					providerId: "hackatime",
					clientId: process.env.HACKATIME_CLIENT_ID!,
					clientSecret: process.env.HACKATIME_CLIENT_SECRET!,
					authorizationUrl: "https://hackatime.hackclub.com/oauth/authorize",
					tokenUrl: "https://hackatime.hackclub.com/oauth/token",
					userInfoUrl: "https://hackatime.hackclub.com/api/v1/authenticated/me",
					scopes: ["profile", "read"],
					mapProfileToUser: function (profile) {
						return {
							name: profile.slack_id,
							email: profile.emails[0],
						};
					},
				},
			],
		}),
	],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
});
