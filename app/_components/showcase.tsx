"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/class";
import { sleep } from "@/lib/utils/general";
import data from "./showcase.json";
import { typewriter } from "@/lib/utils/typewriter";

const PROMPT_PAUSE = 50;
const EXECUTE_PAUSE = 1000;
const THINK_PAUSE = 1500;
const READ_PAUSE = 3000;

enum Phase {
	Command,
	Wait,
	Output,
}

interface CursorProps {
	className?: string;
}

export function Cursor({ className }: CursorProps) {
	return (
		<span
			className={cn("w-2 h-[1em] inline-block bg-primary blink", className)}
		/>
	);
}

export default function Showcase() {
	const [showcaseIndex, setShowcaseIndex] = useState(0);
	const [commandIndex, setCommandIndex] = useState(0);
	const [typedCommand, setTypedCommand] = useState("");
	const [phase, setPhase] = useState(Phase.Command);

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		async function run() {
			let cancelled = false;
			let showcaseCounter = 0;

			while (!cancelled) {
				const showcaseId = showcaseCounter % data.length;
				const showcase = data[showcaseId];

				setShowcaseIndex(showcaseId);
				setCommandIndex(0);
				setTypedCommand("");
				setPhase(Phase.Command);

				for (
					let commandId = 0;
					commandId < showcase.commands.length;
					commandId++
				) {
					await sleep(PROMPT_PAUSE);

					const commandData = showcase.commands[commandId];

					setCommandIndex(commandId);
					setTypedCommand("");
					setPhase(Phase.Command);

					await typewriter(commandData.command, setTypedCommand);

					setPhase(Phase.Wait);
					await sleep(
						"delay" in commandData ? commandData.delay : EXECUTE_PAUSE,
					);
					setPhase(Phase.Output);

					await sleep(THINK_PAUSE);
				}

				await sleep(READ_PAUSE);

				showcaseCounter++;
			}

			return () => {
				cancelled = true;
			};
		}

		run();
	}, []);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		scrollContainer.scrollTop = scrollContainer.scrollHeight;
	});

	const activeShowcase = data[showcaseIndex];

	return (
		<div
			ref={scrollContainerRef}
			className="min-h-0 flex flex-1 flex-col gap-4 overflow-x-clip overflow-y-auto"
		>
			{activeShowcase.commands.slice(0, commandIndex + 1).map((block, i) => {
				const isActive = i === commandIndex;

				return (
					<div key={i} className="flex flex-col">
						<div className="text-base break-words gap-2">
							<span className="text-primary mr-2">{activeShowcase.prompt}</span>
							<span>
								{isActive ? typedCommand : block.command}
								{isActive && phase === Phase.Command && <Cursor />}
							</span>
						</div>
						{isActive && phase === Phase.Wait && <Cursor />}

						{(!isActive || phase === Phase.Output) &&
							block.output.map((line, j) => (
								<div
									key={j}
									className="text-sm text-muted-foreground whitespace-pre-wrap"
								>
									{line}
								</div>
							))}
					</div>
				);
			})}
			{phase === Phase.Output && (
				<div className="flex flex-row items-center gap-2">
					<span className="inline-block text-primary">
						{activeShowcase.prompt}
					</span>
					<Cursor />
				</div>
			)}
		</div>
	);
}
