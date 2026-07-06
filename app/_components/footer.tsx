import ExternalLink from "@/components/external-link";
import Logo from "@/components/logo";
import { IconType } from "@/components/logo-icon";
import { TextType } from "@/components/logo-text";

export default function Footer() {
	const sections = [
		{
			name: "Hack Club",
			links: [
				{ label: "Philosophy", to: "https://hackclub.com/philosophy/" },
				{ label: "Team", to: "https://hackclub.com/team/" },
				{ label: "Donate", to: "https://hackclub.com/philanthropy/" },
			],
		},
		{
			name: "Resources",
			links: [
				{ label: "Slack", to: "https://slack.hackclub.com/" },
				{ label: "Community Events", to: "https://events.hackclub.com/" },
				{ label: "Workshops", to: "https://workshops.hackclub.com/" },
				{ label: "Code of Conduct", to: "https://hackclub.com/conduct/" },
			],
		},
	];

	return (
		<div className="flex flex-wrap sm:flex-nowrap px-6 py-6 bg-background/80 border-t border-border gap-16">
			<div className="basis-1/2 sm:basis-1/3 shrink-0">
				<div className="flex flex-col gap-3">
					<Logo
						iconType={IconType.HackClub}
						textType={TextType.Improv}
						size="md"
					/>
					<div className="text-sm text-muted-foreground">
						Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical
						high schoolers. We believe you learn best by building, so we're
						creating community and providing grants so you can make awesome
						projects. In the past few years, we've partnered with GitHub to run
						Summer of Making, hosted the world's longest hackathon on land, and
						ran Canada's largest high school hackathon.
					</div>
				</div>
			</div>
			{sections.map((section) => (
				<div key={section.name} className="basis-1/2 sm:basis-0 sm:grow">
					<div className="flex flex-col gap-2">
						<p className="text-lg font-heading font-bold">{section.name}</p>
						<div className="flex flex-col gap-1">
							{section.links.map((link) => (
								<ExternalLink
									key={link.label}
									href={link.to}
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{link.label}
								</ExternalLink>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
