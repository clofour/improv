import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { err, ok } from "@/lib/utils/result";

export async function getSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return err(["Unauthorized"]);
	}

	return ok(session);
}
