import { ReactNode } from "react";

interface BezelProps {
	children: ReactNode;
}

export default function Bezel({ children }: BezelProps) {
	return (
		<div className="relative w-full h-full p-6 bg-[url('/frost/metal.jpg')]">
			{children}
		</div>
	);
}
