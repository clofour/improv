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

export async function checkPermissions(
	userID: string,
	permissions: Record<string, string[]>,
) {
	const data = await auth.api.userHasPermission({
		body: {
			userId: userID,
			permissions: permissions,
		},
	});

	return ok(data.success);
}
