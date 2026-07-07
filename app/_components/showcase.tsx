"use client";

import { useEffect, useState } from "react";
import data from "./showcase.json";

const PROMPT_PAUSE = 500;
const CHAR_PAUSE = 100;
const EXECUTE_PAUSE = 1000;
const READ_PAUSE = 3000;

enum Phase {
	Command,
	Output,
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Showcase() {
	const [showcaseIndex, setShowcaseIndex] = useState(0);
	const [commandIndex, setCommandIndex] = useState(0);
	const [typingProgress, setTypingProgress] = useState(0);
	const [phase, setPhase] = useState(Phase.Command);

	useEffect(() => {
		async function run() {
			let cancelled = false;
			let showcaseCounter = 0;

			while (!cancelled) {
				const showcaseId = showcaseCounter % data.length;
				const showcase = data[showcaseId];
				setShowcaseIndex(showcaseId);

				for (
					let commandId = 0;
					commandId < showcase.commands.length;
					commandId++
				) {
					await sleep(PROMPT_PAUSE);

					const commandData = showcase.commands[commandId];

					setCommandIndex(commandId);
					setTypingProgress(0);
					setPhase(Phase.Command);

					for (let i = 1; i <= commandData.command.length; i++) {
						setTypingProgress(i);
						await sleep(CHAR_PAUSE);
					}

					await sleep(
						"delay" in commandData ? commandData.delay : EXECUTE_PAUSE,
					);
					setPhase(Phase.Output);

					await sleep(READ_PAUSE);
				}

				showcaseCounter++;
			}

			return () => (cancelled = true);
		}

		run();
	}, []);

	const activeShowcase = data[showcaseIndex];
	const activeCommandData = activeShowcase.commands[commandIndex];

	return (
		<div className="flex flex-col gap-4">
			{activeShowcase.commands.slice(0, commandIndex + 1).map((block, i) => {
				const isActive = i == commandIndex;

				return (
					<div key={i} className="flex flex-col">
						<div className="flex flex-row flex-wrap text-base gap-2">
							<div className="text-primary">{block.prompt}</div>
							<div>
								{isActive
									? activeCommandData.command.slice(0, typingProgress)
									: block.command}
								{isActive && phase == Phase.Command && (
									<span className="w-2 h-[1em] inline-block bg-primary blink" />
								)}
							</div>
						</div>

						{(!isActive || phase == Phase.Output) &&
							block.output.map((line, j) => (
								<div key={j} className="text-sm text-muted-foreground">
									{line}
								</div>
							))}
					</div>
				);
			})}
		</div>
	);
}
