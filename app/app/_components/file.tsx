"use client";

import { useDesktop } from "./desktop";
import Image from "next/image";

interface FileProps {
	id: string;
}

export default function File({ id }: FileProps) {
	const item = useDesktop((state) => state.items[id]);
	const openWindow = useDesktop((state) => state.openWindow);

	if (!item) return;
	const file = item.file;

	return (
		<>
			<button
				className="flex flex-col p-2 gap-2"
				onClick={() => openWindow(id)}
			>
				<Image src={item.logo} alt={item.name} width={48} height={48}></Image>
				<span className="text-sm">{item.name}</span>
			</button>
		</>
	);
}
