import FAQ from "./_components/faq";
import Flow from "./_components/flow";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Prizes from "./_components/prizes";

export default function Home() {
	return (
		<div>
			<Navbar />
			<div className="flex flex-col flex-1 p-5 items-center justify-center">
				<Hero />
				<Flow />
				<Prizes />
				<FAQ />
				<Footer />
			</div>
		</div>
	);
}
