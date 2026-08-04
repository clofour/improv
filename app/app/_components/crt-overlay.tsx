export default function CRTOverlay() {
	return (
		<div className="absolute inset-0 pointer-events-none animate-crt-flicker opacity-20">
			<div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,color-mix(in_oklab,var(--color-accent)_4%,transparent)_2px,color-mix(in_oklab,var(--color-accent)_4%,transparent)_4px)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,color-mix(in_oklab,var(--color-background)_60%,transparent)_80%,var(--color-background)_100%)]" />
			<div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_oklab,var(--color-accent)_6%,transparent)_2%,transparent_4%)] animate-crt-noise" />
		</div>
	);
}
