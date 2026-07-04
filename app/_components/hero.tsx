import Terminal from "@/components/terminal";

export default function Hero() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 w-full h-full gap-10">
			<div className="w-full h-full">
				<h1>improvise your own infrastructure</h1>
				<p>a lot of text</p>
			</div>
			<div className="w-full h-full">
				<Terminal className="w-full h-full" title="HELLO">
					<p>IDK?</p>
				</Terminal>
			</div>
		</div>
	);
}
