import { ReactNode } from "react";

interface BezelProps {
	children: ReactNode;
}

export default function Bezel({ children }: BezelProps) {
	return (
		<div className="relative w-full h-full bg-neutral-800">
			<div className="absolute inset-0 bg-[url('/frost/metal.jpg')]" />
			<div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />

			<div className="absolute inset-6 p-2 bg-neutral-950 rounded-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_4px_12px_rgba(0,0,0,0.6)]">
				<div className="relative w-full h-full bg-neutral-900 p-1 shadow-[inset_0_0_8px_rgba(0,0,0,0.9)]">
					<div className="relative w-full h-full rounded-sm overflow-hidden">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
