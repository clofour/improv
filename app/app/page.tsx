import { ColdEffectClient } from "@/components/cold-effect";
import Bezel from "./_components/bezel";
import ColdOverlay from "./_components/cold-overlay";
import CRTOverlay from "./_components/crt-overlay";
import Screen from "./_components/screen";
import { EffectMode } from "@/components/effect-mode";

export default function App() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<Bezel>
				<Screen />
				<CRTOverlay />
				<ColdOverlay />
			</Bezel>
			<div className="fixed -inset-8 pointer-events-none bg-[url('/fx/snow-frame.png')] bg-cover bg-center" />
			<ColdEffectClient mode={EffectMode.Foreground} />
		</div>
	);
}
