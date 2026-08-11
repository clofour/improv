import type { ReactNode } from "react";
import type { Vector2D } from "@/lib/utils/2d";
import Projects from "./project/page";
import Shop from "./shop/page";

export interface DesktopItemData {
	id: string;
	name: string;
	logo: string;
	app: ReactNode;
	location: Vector2D;
	draggable: boolean;
}

export type AppData = DesktopItemData[];

const data: AppData = [
	{
		id: "projects",
		name: "Projects",
		logo: "/placeholder.webp",
		app: <Projects />,
		location: { x: 2, y: 2 },
		draggable: true,
	},
	{
		id: "shop",
		name: "Shop",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 3, y: 2 },
		draggable: true,
	},
	{
		id: "explore",
		name: "Explore",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 2, y: 3 },
		draggable: true,
	},
	{
		id: "guide",
		name: "Guides",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 3, y: 4 },
		draggable: true,
	},
	{
		id: "documentation",
		name: "Docs",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 4, y: 4 },
		draggable: true,
	},
];

export default data;

// File
// Initial position
// Can move
// Type -- determines logo and app
// Name
