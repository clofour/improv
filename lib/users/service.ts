import { auth } from "@/lib/auth/config";
import { err, ok } from "@/lib/utils/result";

const PAGE_SIZE = 20;

export async function listUsers(query: string, page: number) {
	try {
		const result = await auth.api.listUsers({
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
		return err(["Failed to list users"]);
	}
}
