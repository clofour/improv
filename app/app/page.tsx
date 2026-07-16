"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Monitor from "./_components/monitor";
import Camera from "./_components/camera";
import monitors from "./_components/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
	const [focus, setFocus] = useState<number | undefined>(undefined);

	return (
		<div className="w-full h-full">
			<Button
				className="absolute bottom-2 left-2 z-9999999"
				variant="outline"
				onClick={() => setFocus(undefined)}
			>
				Back
			</Button>
			<Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
				{monitors.map((monitor, index) => (
					<Monitor
						key={monitor.name}
						position={monitor.position}
						rotation={monitor.rotation}
						onClick={() => setFocus(index)}
					/>
				))}
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
					<planeGeometry args={[20, 20]} />
					<meshStandardMaterial color="#1a1a2e" />
				</mesh>

				<Camera focus={focus} />

				<ambientLight intensity={0.25} />
				<directionalLight position={[5, 5, 5]} />

				<Environment preset="city" />
			</Canvas>
		</div>
	);
}
