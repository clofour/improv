import { sleep } from "@/lib/utils/general";

const SHORT_PUNCTUATION = ",:;";
const LONG_PUNCTUATION = ".!?";
const CHAR_PAUSE = 100;
const TYPO_RATE = 0.05;
const TYPO_REGEX = /[a-zA-Z]/;

export async function typewriter(
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
