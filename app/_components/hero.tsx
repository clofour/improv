import { LinkType } from "@/components/link";
import LinkButton from "@/components/link-button";
import Terminal from "@/components/terminal";
import RSVPButton from "./rsvp-button";
import Section from "./section";
import Showcase from "./showcase";

export default function Hero() {
	return (
		<Section id="hero">
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
							Do you know what happens under the hood when you deploy on
							services like Vercel or Railway, or spin up a VM on a cloud
							provider? Do you <span className="italic">really</span>?
						</p>

						<p>
							Infrastructure is all around us, and yet most of us barely
							understand it. <span className="text-foreground">Improv</span>{" "}
							aims to change that, by helping YOU build your provisioning
							tooling, which you'll actually use for years to come.
						</p>
					</div>
					<div className="flex flex-row gap-3">
						<RSVPButton variant="cta" size="cta" />
						<LinkButton
							type={LinkType.Internal}
							href="/#how"
							size="cta"
							variant="outline"
						>
							See How It Works
						</LinkButton>
					</div>
				</div>
				<div className="relative w-full h-full">
					<Terminal
						className="w-full h-100 sm:h-full sm:absolute sm:inset-0"
						title="SHOWCASES"
					>
						<Showcase />
					</Terminal>
				</div>
			</div>
		</Section>
	);
}
