import {
	genericOAuthClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./config";

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<typeof auth>(), genericOAuthClient()],
});
