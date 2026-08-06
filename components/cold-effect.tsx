"use client";

import type React from "react";
import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { random } from "@/lib/utils";
import dynamic from "next/dynamic";

export enum ColdEffectMode {
	Foreground,
	Background,
}

interface ColdEffectProps {
	mode: ColdEffectMode;
}

export function ColdEffect({ mode }: ColdEffectProps) {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const prefersReducedMotion = useMediaQuery({
		query: "(prefers-reduced-motion: reduce)",
	});
	const visible = !isMobile && !prefersReducedMotion;

	const farSnow = useMemo(
		() =>
			Array.from(
				{ length: mode == ColdEffectMode.Background ? 80 : 45 },
				(_, i) => ({
					id: i,
					x: random(0, 100),
					y: random(0, 100),
					size:
						mode == ColdEffectMode.Background ? random(1, 2.5) : random(1, 2),
					duration:
						mode == ColdEffectMode.Background ? random(10, 20) : random(12, 22),
					delay: random(-20, 0),
				}),
			),
		[],
	);
	const middleSnow = useMemo(
		() =>
			Array.from(
				{ length: mode == ColdEffectMode.Background ? 60 : 30 },
				(_, i) => ({
					id: i,
					px: random(0, 100),
					py: random(0, 100),
					sx:
						mode == ColdEffectMode.Background ? random(20, 80) : random(16, 64),
					sy: mode == ColdEffectMode.Background ? random(1, 2) : random(1, 1.5),
					opacity:
						mode == ColdEffectMode.Background
							? random(0.08, 0.3)
							: random(0.05, 0.16),
					blur:
						mode == ColdEffectMode.Background
							? random(0.3, 2.2)
							: random(0.5, 2),
					duration:
						mode == ColdEffectMode.Background ? random(4, 8) : random(4.5, 9),
					delay: random(-12, 0),
				}),
			),
		[],
	);
	const nearSnow = useMemo(
		() =>
			Array.from(
				{ length: mode == ColdEffectMode.Background ? 30 : 15 },
				(_, i) => ({
					id: i,
					px: random(0, 100),
					py: random(0, 100),
					sx:
						mode == ColdEffectMode.Background
							? random(80, 280)
							: random(60, 200),
					sy: mode == ColdEffectMode.Background ? random(1, 3) : random(1, 2),
					opacity:
						mode == ColdEffectMode.Background
							? random(0.1, 0.35)
							: random(0.05, 0.2),
					blur:
						mode == ColdEffectMode.Background
							? random(0.3, 2.5)
							: random(0.5, 2.5),
					duration:
						mode == ColdEffectMode.Background ? random(3, 7) : random(2.5, 5),
					delay:
						mode == ColdEffectMode.Background ? random(-12, 0) : random(-9, 0),
				}),
			),
		[],
	);
	const snowflakes = useMemo(
		() =>
			Array.from(
				{ length: mode == ColdEffectMode.Background ? 15 : 10 },
				(_, i) => ({
					id: i,
					x: random(0, 100),
					y: random(0, 100),
					size:
						mode == ColdEffectMode.Background ? random(16, 40) : random(12, 36),
					scale:
						mode == ColdEffectMode.Background
							? random(0.4, 0.9)
							: random(0.3, 0.75),
					opacity:
						mode == ColdEffectMode.Background
							? random(0.05, 0.2)
							: random(0.025, 0.15),
					duration:
						mode == ColdEffectMode.Background ? random(14, 28) : random(16, 30),
					delay:
						mode == ColdEffectMode.Background ? random(-26, 0) : random(-28, 0),
				}),
			),
		[],
	);
	const windGusts = useMemo(
		() =>
			Array.from(
				{ length: mode == ColdEffectMode.Background ? 8 : 4 },
				(_, i) => ({
					id: i,
					y: random(0, 110),
					height:
						mode == ColdEffectMode.Background ? random(25, 80) : random(20, 60),
					blur:
						mode == ColdEffectMode.Background ? random(10, 24) : random(12, 26),
					duration:
						mode == ColdEffectMode.Background ? random(8, 16) : random(10, 18),
					delay:
						mode == ColdEffectMode.Background ? random(-14, 0) : random(-16, 0),
				}),
			),
		[],
	);

	if (!visible) return null;

	return (
		<div className="fixed inset-0 pointer-events-none">
			<div
				className={`fixed inset-0 ${mode == ColdEffectMode.Background ? "shadow-[inset_0_0_150px_rgba(0,3,7,0.9),inset_0_60px_90px_rgba(0,8,15,0.5),inset_0_-90px_130px_rgba(0,5,10,0.75)]" : "shadow-[inset_0_0_120px_rgba(0,3,7,0.50),inset_0_50px_75px_rgba(0,8,15,0.25),inset_0_-70px_100px_rgba(0,5,10,0.35)]"}`}
			/>

			<div
				className={`fixed ${mode == ColdEffectMode.Background ? "inset-0" : "-inset-[25%]"} will-change-transform contain-strict`}
			>
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
						className={`absolute ${mode == ColdEffectMode.Background ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),rgba(255,255,255,0.95),rgba(255,255,255,0.25),transparent)]" : "bg-[linear-gradient(90deg,transparent,rgba(225,248,255,0.16),rgba(255,255,255,0.70),rgba(225,248,255,0.16),transparent)]"} rounded-full animate-snow-middle`}
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
						className={`absolute ${mode == ColdEffectMode.Background ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35)_20%,rgba(255,255,255,0.95)_50%,rgba(255,255,255,0.45)_80%,transparent)]" : "bg-[linear-gradient(90deg,transparent,rgba(220,247,255,0.22)_20%,rgba(255,255,255,0.65)_52%,rgba(220,247,255,0.28)_78%,transparent)]"} rounded-full animate-snow-near`}
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

			<div
				className={`fixed ${mode == ColdEffectMode.Background ? "inset-0" : "-inset-[25%]"} will-change-transform contain-strict`}
			>
				{snowflakes.map((snowflake) => (
					<div
						key={snowflake.id}
						className="absolute bg-[url('/fx/snowflake.png')] bg-contain bg-no-repeat bg-center animate-snowflake"
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

			<div
				className={`fixed ${mode == ColdEffectMode.Background ? "inset-0" : "-inset-[25%]"} will-change-transform contain-strict`}
			>
				{windGusts.map((gust) => (
					<div
						key={`gust-${gust.id}`}
						className="absolute -left-[60%] w-[220%] bg-[linear-gradient(110deg,transparent_0%,rgba(230,250,255,0.02)_25%,rgba(235,251,255,0.12)_45%,rgba(235,251,255,0.04)_55%,transparent_80%)] animate-wind-gust"
						style={
							{
								"--duration": `${gust.duration}s`,
								"--delay": `${gust.delay}s`,

								top: `${gust.y}%`,
								height: `${gust.height}px`,
								filter: `blur(${gust.blur}px)`,
							} as React.CSSProperties
						}
					/>
				))}
			</div>

			{mode == ColdEffectMode.Background && (
				<div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(205,238,250,0.14),transparent_45%),linear-gradient(105deg,transparent_10%,rgba(220,246,255,0.05)_35%,rgba(230,250,255,0.10)_50%,rgba(220,246,255,0.04)_65%,transparent_90%)]" />
			)}
		</div>
	);
}

export const ColdEffectClient = dynamic(() => Promise.resolve(ColdEffect), {
	ssr: false,
});
