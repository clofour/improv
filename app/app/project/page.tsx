import { getSession } from "@/lib/auth/session";
import { listProjects } from "@/lib/projects/service";
import Menu from "./_components/menu";

export default async function Projects() {
	const session = await getSession();
	if (!session.ok) return null;

	const data = await listProjects(session.data.user.id);
	if (!data.ok) return null;

	return <Menu data={data.data} />;
}
