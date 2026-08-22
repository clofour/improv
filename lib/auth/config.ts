import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import * as authSchema from "@/lib/db/auth-schema";
import { admin } from "better-auth/plugins/admin";
import {
	accessControl,
	adminRole,
	fulfillerRole,
	helperRole,
	reviewerRole,
} from "./access-control";
import { db } from "../db";

export const auth = betterAuth({
	user: {
		additionalFields: {
			uptimeBalance: {
				type: "number",
				required: true,
				defaultValue: 0,
				input: false,
			},
		},
	},
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
					mapProfileToUser: (profile) => ({
						name: profile.slack_id,
						email: profile.emails[0],
					}),
				},
			],
		}),
		admin({
			ac: accessControl,
			roles: {
				helper: helperRole,
				reviewer: reviewerRole,
				fulfiller: fulfillerRole,
				admin: adminRole,
			},
		}),
	],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
});
