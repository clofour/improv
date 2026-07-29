import { useDesktop } from "./desktop";

export default function Background() {
	const selectFiles = useDesktop((state) => state.selectFiles);

	function onClick() {
		selectFiles([]);
	}

	return (
		<div className="absolute inset-0" onClick={onClick}>
			º
		</div>
	);
}
