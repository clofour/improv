import { useDesktop, WindowStatus } from "./desktop";
import Image from "next/image";

interface TaskProps {
	id: string;
}

export default function Task({ id }: TaskProps) {
	const item = useDesktop((state) => state.items[id]);
	const open = useDesktop((state) => state.openWindow);
	const minimize = useDesktop((state) => state.minimizeWindow);

	if (!item) return;
	const window = item.window;

	function onClick() {
		if (window.status == WindowStatus.Minimized) {
			open(id);
		}

		switch (window.status) {
			case WindowStatus.Minimized:
				open(id);
				break;
			case WindowStatus.Fullscreen:
			case WindowStatus.Open:
				minimize(id);
				break;
		}
	}

	return (
		<button
			className="w-10 h-full flex justify-center items-center px-1 py-0.25"
			onClick={onClick}
		>
			<Image
				src={item.logo}
				alt={item.name}
				width={30}
				height={30}
				objectFit="contain"
				draggable={false}
			/>
		</button>
	);
}
