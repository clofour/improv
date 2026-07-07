"use client";

import { useEffect, useState } from "react";
import data from "./showcase.json";
import { sleep } from "@/lib/sleep";

const SHORT_PUNCTUATION = ",:;";
const LONG_PUNCTUATION = ".!?";
const PROMPT_PAUSE = 2000;
const CHAR_PAUSE = 100;
const TYPO_RATE = 0.05;
const TYPO_REGEX = /[a-zA-Z]/;
const EXECUTE_PAUSE = 1000;
const READ_PAUSE = 3000;

enum Phase {
	Command,
	Output,
}

async function typewriter(
	finalText: string,
	setCurrentText: (fn: (ct: string) => string) => void,
) {
	let cancelled = false;

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
					setTypedCommand("");
					setPhase(Phase.Command);

					await typewriter(commandData.command, setTypedCommand);

					await sleep(
						"delay" in commandData ? commandData.delay : EXECUTE_PAUSE,
					);
					setPhase(Phase.Output);

					await sleep(READ_PAUSE);
				}

				showcaseCounter++;
			}

			return () => {
				cancelled = true;
			};
		}

		run();
	}, []);

	const activeShowcase = data[showcaseIndex];

	return (
		<div className="flex flex-col gap-4">
			{activeShowcase.commands.slice(0, commandIndex + 1).map((block, i) => {
				const isActive = i == commandIndex;

				return (
					<div key={i} className="flex flex-col">
						<div className="flex flex-row flex-wrap text-base gap-2">
							<div className="text-primary">{block.prompt}</div>
							<div>
								{isActive ? typedCommand : block.command}
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
