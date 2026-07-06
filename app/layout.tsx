import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const heading = Space_Grotesk({
	subsets: ["latin"],
	variable: "--heading",
});
const body = Space_Grotesk({ subsets: ["latin"], variable: "--body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--mono" });
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
	title: "Improv",
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
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
