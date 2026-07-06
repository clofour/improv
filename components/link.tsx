import NextLink from "next/link";

export enum LinkType {
	Internal,
	External,
}

type LinkProps = {
	type: LinkType;
	href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "type">;

export default function Link({
	type = LinkType.Internal,
	href,
	children,
	...props
}: LinkProps) {
	switch (type) {
		case LinkType.Internal:
			return (
				<NextLink href={href} {...props}>
					{children}
				</NextLink>
			);
		case LinkType.External:
			return (
				<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
					{children}
				</a>
			);
	}
}
