"use client";

import { useState } from "react";
import { ProjectData } from "../data";
import { ProjectList } from "./project-list";
import { ProjectEditor } from "./editor";

interface ProjectsProps {
	data: ProjectData[];
}

export default function Menu({ data }: ProjectsProps) {
	const [selected, setSelected] = useState<ProjectData | null>(null);

	return (
		<div className="w-full h-full">
			{selected ? (
				<ProjectEditor data={selected} back={() => setSelected(null)} />
			) : (
				<ProjectList data={data} onSelectProject={setSelected} />
			)}
		</div>
	);
}
