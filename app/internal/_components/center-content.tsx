import { ReactNode } from "react";

interface CenterContentProps {
	children: ReactNode;
}

export default function CenterContent({ children }: CenterContentProps) {
	return (
		<div className="flex flex-col w-full max-w-7xl h-full p-5">{children}</div>
	);
}
