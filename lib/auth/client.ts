import {
	adminClient,
	genericOAuthClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./config";
import {
	accessControl,
	adminRole,
	fulfillerRole,
	helperRole,
	reviewerRole,
} from "./access-control";

export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields<typeof auth>(),
		genericOAuthClient(),
		adminClient({
			ac: accessControl,
			roles: {
				helper: helperRole,
				reviewer: reviewerRole,
				fulfiller: fulfillerRole,
				admin: adminRole,
			},
		}),
	],
});
