"use client";

import { useEffect, useRef } from "react";
import Background from "./background";
import { useDesktop } from "./desktop";
import File, { COL_SIZE, ROW_SIZE } from "./file";
import Window from "./window";
import { useMediaQuery } from "react-responsive";
import { AppData } from "../data";

interface ScreenProps {
	data: AppData;
}

export default function Screen({ data }: ScreenProps) {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	const containerRef = useRef<HTMLDivElement | null>(null);
	const register = useDesktop((state) => state.register);

	useEffect(() => {
		if (!containerRef.current) return;

		for (const item of data) {
			register(item.id, item.name, item.logo, item.location);
		}
	}, []);

	return (
		<div className="relative w-full h-full">
			<div className="absolute inset-0 flex flex-col">
				<Background ref={containerRef} />
			</div>
			<div
				className="absolute inset-0 grid"
				style={{
					gridTemplateColumns: `repeat(auto-fill, ${COL_SIZE}px)`,
					gridAutoRows: `${ROW_SIZE}px`,
				}}
			>
				{data.map((file) => (
					<File
						key={file.id}
						id={file.id}
						screenRef={containerRef}
						isMobile={isMobile}
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
