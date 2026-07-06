import Terminal from "@/components/terminal";
import { Button } from "@/components/ui/button";
import RSVPButton from "./rsvp-button";

export default function Hero() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 w-full h-full px-6 py-16 gap-10">
			<div className="flex flex-col w-full h-full gap-5">
				<h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
					improvise
					<br />
					your own
					<br />
					<span className="text-primary glow-primary">provisioning</span>
				</h1>
				<div className="space-y-4 text-muted-foreground text-base font-mono">
					<p>
						Do you know what happens under the hood when you deploy on services
						like Vercel or Railway, or spin up a VM on a cloud provider? Do you{" "}
						<span className="italic">really</span>?
					</p>

					<p>
						Infrastructure is all around us, and yet most of us barely
						understand it. <span className="text-foreground">Improv</span> aims
						to change that, by helping YOU build your provisioning tooling,
						which you'll actually use for years to come.
					</p>
				</div>
				<div className="flex flex-row gap-3">
					<RSVPButton size="lg" />
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
