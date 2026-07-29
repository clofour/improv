"use client";

import { useDesktop, WindowStatus } from "./desktop";
import Task from "./task";

export default function Taskbar() {
	const items = useDesktop((state) => state.items);
	const itemsArray = Object.entries(items);
	const filteredItemsArray = itemsArray.filter(
		([_, item]) => item.window.status != WindowStatus.Closed,
	);

	return (
		<div className="fixed bottom-0 w-full h-10 px-1 py-0.5 bg-muted">
			{filteredItemsArray.map(([id, _]) => (
				<Task key={id} id={id} />
			))}
		</div>
	);
}
