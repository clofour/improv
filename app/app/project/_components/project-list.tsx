import { getSession } from "@/lib/auth/session";
import type { ProjectData } from "../data";
import ProjItem from "./proj-item";

interface ProjectListProps {
	data: ProjectData[];
	onSelectProject: (projectId: string) => void;
}

export function ProjectList({ data, onSelectProject }: ProjectListProps) {
	return (
		<div className="flex flex-col gap-2 w-full h-full px-4 py-2">
			{data.map((project: ProjectData, index: number) => (
				<ProjItem
					key={`projlistitem-${project.id || index}`}
					view={() => onSelectProject(project.id)}
					{...project}
				/>
			))}
		</div>
	);
}
