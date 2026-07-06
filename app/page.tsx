import FAQ from "./_components/faq";
import Flow from "./_components/flow";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Prizes from "./_components/prizes";

export default function Home() {
	return (
		<div className="min-w-screen min-h-screen">
			<Navbar />
			<main className="flex flex-col flex-1 items-center justify-center">
				<Hero />
				<Flow />
				<Prizes />
				<FAQ />
				<Footer />
			</main>
		</div>
	);
}
