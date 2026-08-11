import { auth } from "@/lib/auth/config";
import { err, ok } from "@/lib/utils/result";
import { headers } from "next/headers";

const PAGE_SIZE = 20;

export type User = typeof auth.$Infer.Session.user;

export async function listUsers(query: string, page: number) {
	try {
		const result = await auth.api.listUsers({
			headers: await headers(),
			query: {
				limit: PAGE_SIZE,
				offset: (page - 1) * PAGE_SIZE,

				searchField: "name",
				searchValue: query,
				searchOperator: "contains",
			},
		});

		return ok({
			users: result.users,
			count: result.total,
		});
	} catch (e) {
		console.log(e);
		return err(["Failed to list users"]);
	}
}

export async function getUser(userId: string) {
	try {
		const result = await auth.api.getUser({
			headers: await headers(),
			query: {
				id: userId,
			},
		});

		return ok(result);
	} catch (e) {
		console.log(e);
		return err(["Failed to get user"]);
	}
}
