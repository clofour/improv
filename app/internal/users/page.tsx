import { checkPermissions, getSession } from "@/lib/auth/utils";
import { listUsers } from "@/lib/users/service";
import SearchBar from "./_components/search-bar";
import UserSummary from "./_components/user-summary";
import z from "zod";
import { errParse } from "@/lib/utils/result";

const ListUsersSchema = z.object({
	query: z.string().trim().max(200).optional().default(""),
	page: z.coerce.number().int().min(1).max(100).default(1),
});

interface UsersProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Users({
	searchParams: searchParamsPromise,
}: UsersProps) {
	const searchParams = await searchParamsPromise;

	const session = await getSession();
	if (!session.ok) return null;
	const authorization = await checkPermissions(session.data.user.id, {
		user: ["list"],
	});
	if (!authorization.ok || !authorization.data) return null;

	const query = String(searchParams.q ?? "");
	const page = Number(searchParams.page ?? 1);
	const parse = ListUsersSchema.safeParse({ query, page });
	if (!parse.success) {
		return errParse(parse);
	}
	const result = await listUsers(query, page);
	if (!result.ok) return null;

	return (
		<div className="flex flex-col gap-4">
			<SearchBar />

			<div className="flex flex-col gap-2">
				{result.data.users.map((user) => (
					<UserSummary key={user.id} id={user.id} name={user.name} />
				))}
			</div>
		</div>
	);
}
