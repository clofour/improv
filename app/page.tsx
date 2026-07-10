import FAQ from "./_components/faq";
import Flow from "./_components/flow";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Prizes from "./_components/prizes";
import { Wires } from "./_components/wires";

const connections = [
	{
		from: "showcases",
		to: "architecture-diagram",
	},
];

export default function Home() {
	return (
		<div className="min-w-screen min-h-screen">
			<Navbar />
			<main className="flex flex-col flex-1 items-center justify-center">
				<Wires connections={connections}>
					<Hero />
					<Flow />
					<Prizes />
					<FAQ />
				</Wires>
			</main>
			<Footer />
		</div>
	);
}
