import Link, { LinkType } from "@/components/link";
import Logo from "@/components/logo";
import { IconType } from "@/components/logo-icon";
import { TextType } from "@/components/logo-text";
import Section from "./section";

export default function Footer() {
	const sections = [
		{
			name: "hack club",
			links: [
				{ label: "philosophy", to: "https://hackclub.com/philosophy/" },
				{ label: "team", to: "https://hackclub.com/team/" },
				{ label: "donate", to: "https://hackclub.com/philanthropy/" },
			],
		},
		{
			name: "resources",
			links: [
				{ label: "slack", to: "https://slack.hackclub.com/" },
				{ label: "community events", to: "https://events.hackclub.com/" },
				{ label: "workshops", to: "https://workshops.hackclub.com/" },
				{ label: "code of conduct", to: "https://hackclub.com/conduct/" },
			],
		},
	];

	return (
		<footer className="flex flex-col justify-center items-center bg-background/80 border-t border-border">
			<Section>
				<div className="flex flex-wrap sm:flex-nowrap px-6 py-6 gap-16">
					<div className="basis-full sm:basis-1/3 shrink-0">
						<div className="flex flex-col gap-3">
							<div className="flex flex-row gap-2">
								<Logo
									iconType={IconType.HackClub}
									textType={TextType.None}
									size="md"
								/>
								<Logo
									iconType={IconType.Improv}
									textType={TextType.None}
									size="md"
								/>
							</div>
							<div className="text-sm text-muted-foreground">
								Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical
								high schoolers. we believe you learn best by building, so we're
								creating community and providing grants so you can make awesome
								projects. in the past few years, we've{" "}
								<Link
									type={LinkType.External}
									href="https://summer.hackclub.com/"
									className="underline"
								>
									partnered with GitHub to run Summer of Making
								</Link>
								,{" "}
								<Link
									type={LinkType.External}
									href="https://github.com/hackclub/the-hacker-zephyr"
									className="underline"
								>
									hosted the world's longest hackathon on land
								</Link>
								, and{" "}
								<Link
									type={LinkType.External}
									href="https://www.youtube.com/watch?v=QvCoISXfcE8"
									className="underline"
								>
									ran Canada's largest high school hackathon
								</Link>
								.
							</div>
						</div>
					</div>
					{sections.map((section) => (
						<div key={section.name} className="basis-2/5 sm:basis-0 sm:grow">
							<div className="flex flex-col gap-2">
								<p className="text-lg font-heading font-bold">{section.name}</p>
								<div className="flex flex-col gap-1">
									{section.links.map((link) => (
										<Link
											type={LinkType.External}
											key={link.label}
											href={link.to}
											className="text-sm text-muted-foreground hover:text-foreground"
										>
											{link.label}
										</Link>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</Section>
		</footer>
	);
}
