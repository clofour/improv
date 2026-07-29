"use client";

import { useEffect } from "react";
import File from "./_components/file";
import Taskbar from "./_components/taskbar";
import data from "./data";
import { useDesktop } from "./_components/desktop";
import Window from "./_components/window";

export default function App() {
	const register = useDesktop((state) => state.register);

	useEffect(() => {
		for (const item of data) {
			register(item.id, item.name, item.logo, item.pos);
		}
	}, []);

	return (
		<div className="relative min-w-screen min-h-screen overflow-hidden">
			<div className="p-4">
				{data.map((file) => (
					<File key={file.id} id={file.id} />
				))}
			</div>
			<div>
				{data.map((file) => (
					<Window key={file.id} id={file.id} name={file.name}>
						{file.app}
					</Window>
				))}
				<Taskbar />
			</div>
		</div>
	);
}
