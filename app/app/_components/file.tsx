"use client";

import { useEffect } from "react";
import { FileData } from "../data";
import Window from "./window";
import { useDesktop } from "./desktop";
import Image from "next/image";

export default function File({ name, logo, app, pos, draggable }: FileData) {
	const register = useDesktop((state) => state.register);
	const open = useDesktop((state) => state.open);

	useEffect(() => {
		register(name);
	}, []);

	return (
		<>
			<button className="flex flex-col p-2 gap-2" onClick={() => open(name)}>
				<Image src={logo} alt={name} width={48} height={48}></Image>
				<span className="text-sm">{name}</span>
			</button>
			<Window id={name} name={name}>
				{app}
			</Window>
		</>
	);
}
