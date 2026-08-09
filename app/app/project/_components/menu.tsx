"use client";

import { useActionState, useState } from "react";
import { ProjectData } from "../data";
import { ProjectList } from "./project-list";
import { ProjectEditor } from "./editor";
import { Button } from "@/components/ui/button";
import { createProjectAction } from "../actions";
import { PlusIcon } from "@phosphor-icons/react";

interface ProjectsProps {
	data: ProjectData[];
}

export default function Menu({ data }: ProjectsProps) {
	const [state, formAction, pending] = useActionState(
		createProjectAction,
		null,
	);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const selected = data.find((project) => project.id === selectedId) ?? null;

	return (
		<div className="w-full h-full">
			{selected ? (
				<ProjectEditor data={selected} back={() => setSelectedId(null)} />
			) : (
				<div className="flex flex-col">
					<div className="w-full flex justify-end p-2">
						<form action={formAction}>
							<Button type="submit">
								<PlusIcon data-icon="inline-start" />
								Create Project
							</Button>
						</form>
					</div>
					<ProjectList data={data} onSelectProject={setSelectedId} />
				</div>
			)}
		</div>
	);
}
