"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import type { AppData } from "../data";
import Background from "./background";
import { useDesktop } from "./desktop";
import File, { COL_SIZE, ROW_SIZE } from "./file";
import Window from "./window";
import type { OnboardingState } from "@/lib/users/service";
import { isOnboardingComplete } from "@/lib/helpers/onboarding";

interface ScreenProps {
	onboardingState: OnboardingState;
	data: AppData;
}

export default function Screen({ onboardingState, data }: ScreenProps) {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	const containerRef = useRef<HTMLDivElement | null>(null);
	const register = useDesktop((state) => state.register);
	const openWindow = useDesktop((state) => state.openWindow);
	const closeWindow = useDesktop((state) => state.closeWindow);

	const onboardingComplete = isOnboardingComplete(onboardingState);

	useEffect(() => {
		if (!containerRef.current) return;

		for (const item of data) {
			register(item.id, item.name, item.logo, item.file);
		}
	}, []);
	useEffect(() => {
		if (!onboardingComplete) {
			openWindow("onboarding", isMobile);
		} else {
			closeWindow("onboarding");
		}
	}, [onboardingComplete]);

	console.log(onboardingComplete);

	return (
		<div className="relative w-full h-full">
			<div className="absolute inset-0 flex flex-col">
				<Background ref={containerRef} />
			</div>
			<div>
				<div
					className="absolute inset-0 grid"
					style={{
						gridTemplateColumns: `repeat(auto-fill, ${COL_SIZE}px)`,
						gridAutoRows: `${ROW_SIZE}px`,
					}}
				>
					{data.map(
						(item) =>
							item.file && (
								<File
									key={item.id}
									id={item.id}
									screenRef={containerRef}
									isMobile={isMobile}
								/>
							),
					)}
				</div>
				<div>
					{data.map(
						(item) =>
							item.window && (
								<Window
									key={item.id}
									screenRef={containerRef}
									id={item.id}
									name={item.name}
								>
									{item.window.app}
								</Window>
							),
					)}
				</div>
			</div>
		</div>
	);
}
