import { headers } from "next/headers";
import { auth } from "./auth";
import { err, ok } from "./result";

export async function getSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return err(["Unauthorized"]);
	}

	return ok(session);
}
