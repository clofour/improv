import { LinkType } from "@/components/link";
import LinkButton from "@/components/link-button";
import { auth } from "@/lib/auth/config";
import { checkPermissions, getSession } from "@/lib/auth/utils";
import { getUser, type User } from "@/lib/users/service";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import BackButton from "../../_components/back-button";
import displayBool from "@/lib/utils/display";

interface UserProps {
	params: Promise<{ id: string }>;
}

export default async function User({ params: paramsPromise }: UserProps) {
	const params = await paramsPromise;
	const userId = params.id;

	const session = await getSession();
	if (!session.ok) return null;
	const authorization = await checkPermissions(session.data.user.id, {
		user: ["get"],
	});
	if (!authorization.ok || !authorization.data) return null;

	const result = await getUser(userId);
	if (!result.ok) return null;

	const user = result.data as User;

	return (
		<div>
			<BackButton />

			<div>
				<div>Name: {user.name}</div>
				<div>Email: {user.email}</div>
				<div>Roles: {user.role}</div>
				<div>Balance: {user.uptimeBalance}</div>
				<div>Banned: {displayBool(user.banned ?? false)}</div>
			</div>
		</div>
	);
}
