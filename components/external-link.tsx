type ExternalLinksProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
};

export default function ExternalLink({
	href,
	children,
	...props
}: ExternalLinksProps) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
			{children}
		</a>
	);
}
