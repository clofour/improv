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
				padding: "40px",
				backgroundColor: "#010509",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					background: "linear-gradient(180deg, #050f15e6, #050f15cc)",
					border: "1px solid #1d2b34",
				}}
			>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						flexShrink: 0,
						justifyContent: "space-between",
						alignContent: "center",
						padding: "4px 8px 4px 8px",
						background: "#111c23",
						borderBottom: "1px solid #1d2b34",
					}}
				>
					<span style={{ color: "#6e848f", textTransform: "uppercase" }}>
						Improv
					</span>
					<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<div
							style={{
								width: "9px",
								height: "9px",
								borderRadius: "50%",
								background: "#81cae1",
							}}
						/>
						<div
							style={{
								width: "9px",
								height: "9px",
								borderRadius: "50%",
								background: "#8fb5c3",
							}}
						/>
						<div
							style={{
								width: "9px",
								height: "9px",
								borderRadius: "50%",
								background: "#cd3380",
							}}
						/>
					</div>
				</div>

				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: "50px",
						padding: "8px",
					}}
				>
					<svg
						aria-label="Improv"
						height={200}
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
							fontSize: "200px",
						}}
					>
						Improv
					</div>
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
