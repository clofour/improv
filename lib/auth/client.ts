import {
	adminClient,
	genericOAuthClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { accessControl, fulfiller, helper, reviewer } from "./access-control";
import type { auth } from "./config";

export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields<typeof auth>(),
		genericOAuthClient(),
		adminClient({
			ac: accessControl,
			roles: {
				helper,
				reviewer,
				fulfiller,
			},
		}),
	],
});
