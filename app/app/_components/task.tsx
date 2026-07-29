import { useDesktop, WindowStatus } from "./desktop";

interface TaskProps {
	id: string;
}

export default function Task({ id }: TaskProps) {
	const item = useDesktop((state) => state.items[id]);
	const window = item.window;
	const open = useDesktop((state) => state.openWindow);
	const minimize = useDesktop((state) => state.minimizeWindow);

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
			className="w-10 h-full flex justify-center align-center px-1 py-0.25"
			onClick={onClick}
		>
			hell
		</button>
	);
}
