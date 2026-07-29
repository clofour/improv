"use client";

import { useDesktop, WindowStatus } from "./desktop";
import Task from "./task";

export default function Taskbar() {
	const windows = useDesktop((state) => state.windows);
	const windowsArray = Object.entries(windows);
	const filteredWindowsArray = windowsArray.filter(
		([_, window]) => window.status != WindowStatus.Closed,
	);

	return (
		<div className="fixed bottom-0 w-full h-10 bg-muted">
			{filteredWindowsArray.map(([id, window]) => (
				<Task key={id} id={id} />
			))}
		</div>
	);
}
