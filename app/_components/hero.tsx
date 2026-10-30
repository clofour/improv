import { LinkType } from "@/components/link";
import LinkButton from "@/components/link-button";
import Terminal from "@/components/terminal";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import RSVPButton from "./rsvp-button";
import Section from "./section";
import Showcase from "./showcase";

export default function Hero() {
	return (
		<Section id="hero">
			<div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] items-center px-6 py-12 lg:py-10 lg:min-h-[calc(100svh-4rem)] gap-10 lg:gap-14">
				<div className="flex flex-col gap-6">
					<h1 className="text-5xl sm:text-6xl xl:text-7xl font-heading font-bold tracking-tight leading-[0.95]">
						improvise
						<br />
						your own
						<br />
						<span className="text-primary">provisioning</span>
						<Tooltip>
							<TooltipTrigger
								render={
									<button
										type="button"
										aria-label="what does provisioning mean?"
										className="relative -top-[1.05em] ml-3 inline-block align-baseline font-mono text-[0.32em] font-normal tracking-normal leading-none text-primary/70 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
									>
										?
									</button>
								}
							/>
							<TooltipContent side={"top"} className="border-2 border-border">
								process of setting up the infrastructure necessary to run an
								aplication such as creating a server, installing software,
								configuring networking/storage and getting everything ready for
								the application to run
							</TooltipContent>
						</Tooltip>
					</h1>
					<div className="max-w-xl space-y-3 text-muted-foreground text-base leading-relaxed">
						<p className="text-foreground">
							do you know what happens under the hood when you deploy on
							services like Vercel or Railway, or spin up a VM on a cloud
							provider? do you <span className="italic">really</span>?
						</p>

						<p className="text-foreground">
							well, it's 2030. temperatures dropped out of nowhere. no
							explanations, no managed services, no cloud providers and no one
							coming to help. if you want compute, comms, or storage, you build
							it yourself.
						</p>

						<p>
							not sure where to start? you can build a small container
							orchestrator, which takes an app and deploys it automatically,
							without setting everything up by hand. alternatively, you can
							deploy MediaWiki using tools like Ansible or Terraform.
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
							see how it works
						</LinkButton>
					</div>
				</div>
				<div className="relative h-80 lg:h-[min(30rem,70svh)]">
					<Terminal
						className="w-full h-full absolute inset-0"
						title="showcases"
					>
						<Showcase />
					</Terminal>
				</div>
			</div>
		</Section>
	);
}
