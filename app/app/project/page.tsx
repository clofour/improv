import { getSession } from "@/lib/auth/utils";
import { listProjects } from "@/lib/projects/service";
import Menu from "./_components/menu";

export default async function Projects() {
	const session = await getSession();
	if (!session.ok) return null;

	const result = await listProjects(session.data.user.id);
	if (!result.ok) return null;

	const data = result.data.map((project) => ({
		id: project.id,
		name: project.name ?? "My Project",
		description: project.description ?? "",
		image: "/placeholder.webp",
		codeURL: project.codeURL ?? "",
		demoURL: project.demoURL ?? "",
		createdAt: project.createdAt.toISOString(),
		logs: [],
	}));

	return <Menu data={data} />;
}
