import React, { useState } from "react";
import { ProjectData } from "./data";
import { ProjectList } from "./_components/project-list";
import { ProjectEditor } from "./_components/editor";

export default function Project() {
	const [selected, setSelected] = useState<ProjectData | null>(null);

	return (
		<div className="w-full h-full">
			{selected ? (
				<ProjectEditor data={selected} back={() => setSelected(null)} />
			) : (
				<ProjectList onSelectProject={setSelected} />
			)}
		</div>
	);
}
