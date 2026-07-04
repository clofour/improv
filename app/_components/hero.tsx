import Terminal from "@/components/terminal";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 w-full h-full px-6 py-16 gap-10">
			<div className="flex flex-col w-full h-full gap-5">
				<h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
					improvise
					<br />
					your own
					<br />
					<span className="text-primary glow-primary">infrastructure</span>
				</h1>
				<p className="text-muted-foreground text-base font-mono">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<div className="flex flex-row gap-3">
					<Button size="lg">Get Started</Button>
					<Button size="lg" variant="outline">
						Read Docs
					</Button>
				</div>
			</div>
			<div className="w-full h-full">
				<Terminal className="w-full h-full" title="HELLO">
					<p>IDK?</p>
				</Terminal>
			</div>
		</div>
	);
}
