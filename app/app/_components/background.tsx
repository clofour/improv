import { useDesktop } from "./desktop";

interface BackgroundProps {
	ref: React.Ref<HTMLDivElement>;
}

export default function Background({ ref }: BackgroundProps) {
	const selectFiles = useDesktop((state) => state.selectFiles);

	function onClick() {
		selectFiles([]);
	}

	return <div ref={ref} className="flex-1 bg-black" onClick={onClick} />;
}
