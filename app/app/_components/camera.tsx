"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import monitors from "./data";

interface CameraProps {
	focus?: number;
}

export default function Camera({ focus }: CameraProps) {
	const { camera } = useThree();
	const targetPos = useRef(new THREE.Vector3(0, 2, 6));
	const targetLook = useRef(new THREE.Vector3(0, 1.5, 0));
	const currentLook = useRef(new THREE.Vector3(0, 1.5, 0));

	useFrame((_, delta) => {
		if (focus != null) {
			const monitor = monitors[focus];

			const dir = new THREE.Vector3(0, 0, 2.5).applyEuler(
				new THREE.Euler(...monitor.rotation),
			);

			targetPos.current.set(...monitor.position).add(dir);
			targetLook.current.set(...monitor.position);
		} else {
			targetPos.current.set(0, 2, 6);
			targetLook.current.set(0, 1.5, 0);
		}

		camera.position.lerp(targetPos.current, 1 - Math.exp(-3 * delta));

		currentLook.current.lerp(targetLook.current, 1 - Math.exp(-3 * delta));
		camera.lookAt(currentLook.current);
	});

	return null;
}
