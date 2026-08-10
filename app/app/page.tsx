import { ColdEffectClient } from "@/components/cold-effect";
import { EffectMode } from "@/components/effect-mode";
import Bezel from "./_components/bezel";
import ColdOverlay from "./_components/cold-overlay";
import CRTOverlay from "./_components/crt-overlay";
import Screen from "./_components/screen";
import data from "./data";

export default function App() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<Bezel>
				<Screen data={data} />
				<CRTOverlay />
				<ColdOverlay />
			</Bezel>
			<div className="fixed -inset-8 pointer-events-none bg-[url('/fx/snow-frame.png')] bg-cover bg-center" />
			<ColdEffectClient mode={EffectMode.Foreground} />
		</div>
	);
}
