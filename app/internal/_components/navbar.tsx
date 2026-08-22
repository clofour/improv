"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import data from "../data";
import Link, { LinkType } from "@/components/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const path = usePathname();
	const page = data.find((page) => path.startsWith(page.href));

	return (
		<div className="z-50 sticky top-0 flex flex-col justify-center px-1 bg-background/80 border-b border-border">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							{page?.name ?? "Unknown"}
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							{data.map((page) => (
								<NavigationMenuLink
									key={page.id}
									render={<Link type={LinkType.Internal} href={page.href} />}
								>
									{page.name}
								</NavigationMenuLink>
							))}
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
