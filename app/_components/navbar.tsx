import Link, { LinkType } from "@/components/link";
import Logo from "@/components/logo";
import { IconType } from "@/components/logo-icon";
import { TextType } from "@/components/logo-text";
import RSVPButton from "./rsvp-button";
import Section from "./section";

export default function Navbar() {
	const links = [
		{
			label: "how",
			href: "/#how",
		},
		{
			label: "prizes",
			href: "/#prizes",
		},
		{
			label: "faq",
			href: "/#faq",
		},
	];

	return (
		<nav className="z-50 sticky top-0 flex flex-col justify-center items-center bg-background/80 border-b border-border">
			<Section>
				<div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-3">
					<Logo
						iconType={IconType.Improv}
						textType={TextType.Improv}
						size="md"
					/>
					<div className="flex flex-row justify-center items-center gap-7.5 hidden sm:flex">
						{links.map((link) => (
							<Link
								type={LinkType.Internal}
								key={link.label}
								href={link.href}
								className="text-muted-foreground hover:text-foreground"
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="flex justify-end">
						<RSVPButton size="lg" />
					</div>
				</div>
			</Section>
		</nav>
	);
}
