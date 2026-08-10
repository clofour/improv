import Nav from "./_components/nav";

export default function InternalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Nav />

			<div>{children}</div>
		</div>
	);
}
