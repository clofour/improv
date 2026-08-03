import Bezel from "./_components/bezel";
import Screen from "./_components/screen";

export default function App() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<Bezel>
				<Screen />
			</Bezel>
		</div>
	);
}
