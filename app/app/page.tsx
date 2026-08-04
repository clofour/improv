import Bezel from "./_components/bezel";
import Screen from "./_components/screen";
import ScreenOverlay from "./_components/screen-overlay";

export default function App() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<Bezel>
				<Screen />
				<ScreenOverlay />
			</Bezel>
		</div>
	);
}
