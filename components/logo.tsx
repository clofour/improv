import LogoIcon, { type IconType } from "./logo-icon";
import LogoText, { type TextType } from "./logo-text";

export type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
	iconType: IconType;
	textType: TextType;
	size: LogoSize;
}

export default function Logo({ iconType, textType, size }: LogoProps) {
	return (
		<div className="flex flex-row items-center gap-3">
			<LogoIcon type={iconType} size={size} />
			<LogoText type={textType} size={size} />
		</div>
	);
}
