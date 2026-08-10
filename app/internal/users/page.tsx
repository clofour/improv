import { checkPermissions, getSession } from "@/lib/auth/utils";
import { listUsers } from "@/lib/users/service";
import SearchBar from "./_components/search-bar";

export default async function Users() {
	const session = await getSession();
	if (!session.ok) return null;
	const authorization = await checkPermissions(session.data.user.id, {
		user: ["list"],
	});

	// TODO: Authorization is not checked

	// const result = await listUsers();
	// if (!result.ok) return null;

	return (
		<div>
			<SearchBar />
		</div>
	);
}
