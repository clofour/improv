"use client";

import { useEffect, useState } from "react";
import { typewriter } from "@/lib/utils/typewriter";
import LinkHackatime from "./_components/link-hackatime";

const ONBOARD_COMMAND = "python onboard.py";

/*
Stage 1: Join Slack
Stage 2: Connect Hackatime
Stage 3: Create a Project
*/

export default function Onboarding() {
	const [command, setCommand] = useState("");
	const [stageIndex, setStageIndex] = useState(0);

	useEffect(() => {
		async function run() {
			let cancelled = false;

			await typewriter(ONBOARD_COMMAND, setCommand);

			return () => {
				cancelled = true;
			};
		}
		run();
	}, []);

	return (
		<div className="min-h-0 flex flex-1 flex-col gap-4 overflow-x-clip overflow-y-auto">
			<div className="text-base break-words gap-2">
				<span className="text-primary mr-2">root@server</span>
				<span>{command}</span>
			</div>
			<div className="flex flex-col">
				<span className="text-sm text-muted-foreground whitespace-pre-wrap">
					Welcome to Improv, agent. To start your mission, link Hackatime.
				</span>
				<LinkHackatime />
			</div>
		</div>
	);
}
