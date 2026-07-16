"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { Vec3 } from "./data";

interface MonitorProps {
	position: Vec3;
	rotation: Vec3;
	onClick: () => void;
}

export default function Monitor({ position, rotation, onClick }: MonitorProps) {
	return (
		<group position={position} rotation={rotation}>
			<RoundedBox radius={0.04} smoothness={4} args={[2, 1.4, 0.1]}>
				<meshStandardMaterial color="#1a1a2e" />
			</RoundedBox>

			<mesh position={[0, 0, 0.06]} onClick={onClick}>
				<planeGeometry args={[1.8, 1.2]} />
				<meshStandardMaterial
					color="#0f172a"
					emissive="#0f172a"
					emissiveIntensity={0.3}
				/>
			</mesh>

			<Html
				transform
				occlude="blending"
				position={[0, 0, 0.08]}
				distanceFactor={1.5}
			>
				<div>Hello!</div>
			</Html>
		</group>
	);
}
