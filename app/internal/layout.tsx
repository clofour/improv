import CenterContent from "./_components/center-content";
import Navbar from "./_components/navbar";

export default function InternalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Navbar />

			<div className="w-full h-full flex flex-col items-center">
				<CenterContent>{children}</CenterContent>
			</div>
		</div>
	);
}
