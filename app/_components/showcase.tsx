"use client";

import { useEffect, useRef, useState } from "react";
import { sleep } from "@/lib/sleep";
import { cn } from "@/lib/utils";
import data from "./showcase.json";

const SHORT_PUNCTUATION = ",:;";
const LONG_PUNCTUATION = ".!?";
const PROMPT_PAUSE = 50;
const CHAR_PAUSE = 100;
const TYPO_RATE = 0.05;
const TYPO_REGEX = /[a-zA-Z]/;
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

async function typewriter(
	finalText: string,
	setCurrentText: (fn: (ct: string) => string) => void,
) {
	const cancelled = false;

	function calculateDelay(character: string) {
		let delay = CHAR_PAUSE * (Math.random() + 0.5);

		if (SHORT_PUNCTUATION.includes(character)) {
			delay += 200;
		}
		if (LONG_PUNCTUATION.includes(character)) {
			delay += 420;
		}

		return delay;
	}

	async function run() {
		for (const character of finalText) {
			if (cancelled) return;

			if (TYPO_REGEX.test(character) && Math.random() < TYPO_RATE) {
				const typoCharacter = String.fromCharCode(
					97 + Math.floor(Math.random() * 26),
				);
				setCurrentText((ct) => ct + typoCharacter);

				await sleep(calculateDelay(typoCharacter));
				setCurrentText((prev) => prev.slice(0, -1));

				await sleep(90 + Math.random() * 90);
			}

			setCurrentText((ct) => ct + character);
			await sleep(calculateDelay(character));
		}
	}

	await run();
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
