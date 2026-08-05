import { random } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";

export default function ColdEffect() {
	const farSnow = useMemo(
		() =>
			Array.from({ length: 120 }, (_, i) => ({
				id: i,
				x: random(0, 100),
				y: random(0, 100),
				size: random(1, 3.5),
				duration: random(9, 18),
				delay: random(-20, 0),
			})),
		[],
	);
	const middleSnow = useMemo(
		() =>
			Array.from({ length: 90 }, (_, i) => ({
				id: i,
				px: random(0, 100),
				py: random(0, 100),
				sx: random(20, 110),
				sy: random(1, 2.5),
				opacity: random(0.15, 0.55),
				blur: random(0, 2.2),
				duration: random(3, 7),
				delay: random(-12, 0),
			})),
		[],
	);
	const nearSnow = useMemo(
		() =>
			Array.from({ length: 50 }, (_, i) => ({
				id: i,
				px: random(0, 100),
				py: random(0, 100),
				sx: random(120, 480),
				sy: random(1, 4),
				opacity: random(0.2, 0.7),
				blur: random(0, 2.5),
				duration: random(3, 7),
				delay: random(-12, 0),
			})),
		[],
	);
	const snowflakes = useMemo(
		() =>
			Array.from({ length: 30 }, (_, i) => ({
				id: i,
				x: random(0, 100),
				y: random(0, 100),
				size: random(18, 55),
				scale: random(0.5, 1.1),
				opacity: random(0.1, 0.4),
				duration: random(12, 26),
				delay: random(-24, 0),
			})),
		[],
	);

	return (
		<div className="fixed inset-0 pointer-events-none">
			<div className="fixed inset-0 shadow-[inset_0_0_150px_rgba(0,3,7,0.9),inset_0_60px_90px_rgba(0,8,15,0.5),inset_0_-90px_130px_rgba(0,5,10,0.75)]" />

			<div className="fixed inset-0">
				{farSnow.map((snow) => (
					<div
						key={`far-${snow.id}`}
						className="absolute bg-white/55 rounded-full animate-snow-far"
						style={
							{
								"--duration": `${snow.duration}s`,
								"--delay": `${snow.delay}s`,

								left: `${snow.x}%`,
								top: `${snow.y}%`,
								width: `${snow.size}px`,
								height: `${snow.size}px`,
							} as React.CSSProperties
						}
					/>
				))}
				{middleSnow.map((snow) => (
					<div
						key={`middle-${snow.id}`}
						className="absolute bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),rgba(255,255,255,0.95),rgba(255,255,255,0.25),transparent)] rounded-full animate-snow-middle"
						style={
							{
								"--opacity": `${snow.opacity}`,
								"--duration": `${snow.duration}s`,
								"--delay": `${snow.delay}s`,

								left: `${snow.px}%`,
								top: `${snow.py}%`,
								width: `${snow.sx}px`,
								height: `${snow.sy}px`,
								filter: `blur(${snow.blur}px)`,
							} as React.CSSProperties
						}
					/>
				))}
				{nearSnow.map((snow) => (
					<div
						key={`near-${snow.id}`}
						className="absolute bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35)_20%,rgba(255,255,255,0.95)_50%,rgba(255,255,255,0.45)_80%,transparent)] rounded-full animate-snow-near"
						style={
							{
								"--opacity": `${snow.opacity}`,
								"--duration": `${snow.duration}s`,
								"--delay": `${snow.delay}s`,

								left: `${snow.px}%`,
								top: `${snow.py}%`,
								width: `${snow.sx}px`,
								height: `${snow.sy}px`,
								filter: `blur(${snow.blur}px)`,
							} as React.CSSProperties
						}
					/>
				))}
			</div>

			<div className="fixed inset-0">
				{snowflakes.map((snowflake) => (
					<Image
						key={snowflake.id}
						src="/fx/snowflake.png"
						alt="Snowflake"
						width={snowflake.size}
						height={snowflake.size}
						className="absolute animate-snowflake"
						style={
							{
								"--scale": `${snowflake.scale}`,
								"--opacity": `${snowflake.opacity}`,
								"--duration": `${snowflake.duration}s`,
								"--delay": `${snowflake.delay}s`,

								left: `${snowflake.x}%`,
								top: `${snowflake.y}%`,
								width: `${snowflake.size}px`,
								height: `${snowflake.size}px`,
							} as React.CSSProperties
						}
					/>
				))}
			</div>
		</div>
	);
}
