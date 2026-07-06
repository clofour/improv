import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { TextType } from "@/components/logo-text";
import { IconType } from "@/components/logo-icon";

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
		<nav className="sticky top-0 flex flex-row justify-between items-center px-6 py-3 bg-background/80">
			<div className="flex flex-row gap-10">
				<Logo
					iconType={IconType.HackClub}
					textType={TextType.Improv}
					size="md"
				/>
				<div className="flex flex-row gap-5">
					{links.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="text-muted-foreground hover:text-foreground"
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
			<div>
				<Button variant="outline" size="lg">
					Sign In
				</Button>
			</div>
		</nav>
	);
}
