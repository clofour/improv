import { ColdEffectClient } from "@/components/cold-effect";
import FAQ from "./_components/faq";
import Flow from "./_components/flow";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Prizes from "./_components/prizes";
import { EffectMode } from "@/components/effect-mode";

export default function Home() {
	return (
		<div className="min-w-screen min-h-screen -z-10 bg-[linear-gradient(180deg,oklch(0.18_0.027_238)_0%,oklch(0.17_0.027_240)_38%,oklch(0.13_0.022_240)_72%,oklch(0.11_0.016_230)_100%)]">
			<ColdEffectClient mode={EffectMode.Background} />
			<Navbar />
			<main className="flex flex-col flex-1 items-center justify-center">
				<Hero />
				<Flow />
				<Prizes />
				<FAQ />
			</main>
			<Footer />
		</div>
	);
}
