import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils/class";
import { TooltipProvider } from "@/components/ui/tooltip";

const heading = localFont({
	src: [
		{ path: "./fonts/redaction/20-400.woff2", weight: "400" },
		{ path: "./fonts/redaction/20-700.woff2", weight: "700" },
	],
	display: "swap",
	variable: "--heading",
});
const body = IBM_Plex_Sans({
	subsets: ["latin"],
	style: ["normal", "italic"],
	variable: "--body",
});
const mono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--mono",
});
const hc = localFont({
	src: [
		{ path: "./fonts/phantom-sans/regular.woff2" },
		{ path: "./fonts/phantom-sans/italic.woff2" },
		{ path: "./fonts/phantom-sans/bold.woff2" },
	],
	display: "swap",
	variable: "--hc",
});

export const metadata: Metadata = {
	title: "Improv — Improvise your own provisioning tooling",
	description: "Hack Club YSWS, centering on infrastructure",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				"h-full",
				"antialiased",
				heading.variable,
				body.variable,
				mono.variable,
				hc.variable,
			)}
		>
			<body className="min-h-full flex flex-col">
				<TooltipProvider>{children}</TooltipProvider>
			</body>
		</html>
	);
}
