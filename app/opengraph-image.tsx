import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";

export const contentType = "image/png";

export default async function Image({}: {}) {
	const fileData = await readFile(
		join(process.cwd(), "app/fonts/space-grotesk/bold.ttf"),
	);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#010509",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "30px",
				}}
			>
				<svg
					aria-label="Improv"
					height={250}
					stroke="#81cae1"
					viewBox="0 0 220 220"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polyline
						points="210,10 10,10 10,210"
						strokeWidth="4"
						strokeLinecap="butt"
						strokeDasharray="14 10"
						fill="none"
					/>
					<polygon points="210,10 210,210, 10,210" fill="#81cae1" />
				</svg>
				<div
					style={{
						fontFamily: "Space Grotesk",
						color: "#ffffff",
						fontWeight: "bold",
						fontSize: "240px",
					}}
				>
					Improv
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Space Grotesk",
					data: fileData,
					weight: 700,
					style: "normal",
				},
			],
		},
	);
}
