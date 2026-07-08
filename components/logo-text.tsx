import { cva } from "class-variance-authority";
import type { LogoSize } from "./logo";

export enum TextType {
	None,
	HackClub,
	Improv,
}

interface LogoTextProps {
	type: TextType;
	size: LogoSize;
}

const textContents = {
	[TextType.HackClub]: "Hack Club",
	[TextType.Improv]: "Improv",
};

const textVariants = cva("leading-none", {
	variants: {
		type: {
			[TextType.HackClub]: "font-hc",
			[TextType.Improv]: "font-heading font-bold",
		},
		size: {
			sm: "text-[12px]",
			md: "text-[22px]",
			lg: "text-[32px]",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export default function LogoText({ type, size }: LogoTextProps) {
	if (type === TextType.None) return;

	return (
		<div className={textVariants({ type, size })}>{textContents[type]}</div>
	);
}
