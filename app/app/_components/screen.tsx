"use client";

import { useEffect, useRef } from "react";
import data from "../data";
import Background from "./background";
import { useDesktop } from "./desktop";
import File from "./file";
import Window from "./window";

export default function Screen() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const register = useDesktop((state) => state.register);

	useEffect(() => {
		if (!containerRef.current) return;

		for (const item of data) {
			register(item.id, item.name, item.logo);
		}
	}, []);

	return (
		<div className="relative w-full h-full">
			<div className="absolute inset-0 flex flex-col">
				<Background ref={containerRef} />
			</div>
			<div>
				{data.map((file) => (
					<File
						key={file.id}
						screenRef={containerRef}
						id={file.id}
						initLocation={file.location}
					/>
				))}
			</div>
			<div>
				{data.map((file) => (
					<Window
						key={file.id}
						screenRef={containerRef}
						id={file.id}
						name={file.name}
					>
						{file.app}
					</Window>
				))}
			</div>
		</div>
	);
}
