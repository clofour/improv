export default function ColdOverlay() {
	return (
		<div className="opacity-25">
			<div className="absolute inset-0 pointer-events-none bg-[url('/fx/ice.jpg')] opacity-12.5 mix-blend-screen" />
			<div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_8%_5%,rgba(235,245,250,0.38)_0%,rgba(220,235,240,0.18)_18%,transparent_42%),radial-gradient(ellipse_at_92%_8%,rgba(235,245,250,0.28)_0%,rgba(220,235,240,0.12)_20%,transparent_45%),radial-gradient(ellipse_at_5%_88%,rgba(235,245,250,0.18)_0%,transparent_38%),radial-gradient(ellipse_at_95%_92%,rgba(235,245,250,0.32)_0%,rgba(220,235,240,0.12)_20%,transparent_40%)]" />
		</div>
	);
}
