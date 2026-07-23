import Terminal from "@/components/terminal";
import { ReactNode } from "react";
import { useDesktop, WindowStatus } from "./desktop";

interface WindowProps {
	id: string;
	name: string;
	children: ReactNode;
}

export default function Window({ id, name, children }: WindowProps) {
	const window = useDesktop((state) => state.windows[id]);
	const close = useDesktop((state) => state.close);
	if (!window) return;

	return (
		<Terminal
			title={name}
			className="absolute"
			style={{
				display: window.status == WindowStatus.Open ? "flex" : "none",
				zIndex: window.zIndex,
			}}
			onClose={() => close(id)}
		>
			{children}
		</Terminal>
	);
}
