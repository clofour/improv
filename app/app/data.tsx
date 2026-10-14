import type { ReactNode } from "react";
import type { Vector2D } from "@/lib/utils/2d";
import Projects from "./project/page";
import Shop from "./shop/page";
import Onboarding from "./onboarding/page";
import { WindowStatus } from "./_components/desktop";

export interface FileData {
	location: Vector2D;
	draggable: boolean;
}
export interface WindowData {
	app: ReactNode;
	default?: WindowStatus;
}
export interface DesktopItemData {
	id: string;
	name: string;
	logo: string;
	file?: FileData;
	window?: WindowData;
}

export type AppData = DesktopItemData[];

const data: AppData = [
	{
		id: "onboarding",
		name: "Onboarding",
		logo: "/placeholder.webp",
		window: {
			app: <Onboarding />,
		},
	},
	{
		id: "projects",
		name: "Projects",
		logo: "/placeholder.webp",
		file: {
			location: { x: 2, y: 2 },
			draggable: true,
		},
		window: {
			app: <Projects />,
		},
	},
	{
		id: "shop",
		name: "Shop",
		logo: "/placeholder.webp",
		file: {
			location: { x: 3, y: 2 },
			draggable: true,
		},
		window: {
			app: <Shop />,
		},
	},
	{
		id: "explore",
		name: "Explore",
		logo: "/placeholder.webp",
		file: {
			location: { x: 2, y: 3 },
			draggable: true,
		},
		window: {
			app: <Shop />,
		},
	},
	{
		id: "guide",
		name: "Guides",
		logo: "/placeholder.webp",
		file: {
			location: { x: 3, y: 4 },
			draggable: true,
		},
		window: {
			app: <Shop />,
		},
	},
	{
		id: "documentation",
		name: "Docs",
		logo: "/placeholder.webp",
		file: {
			location: { x: 4, y: 4 },
			draggable: true,
		},
		window: {
			app: <Shop />,
		},
	},
];

export default data;
