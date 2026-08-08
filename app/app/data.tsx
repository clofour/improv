import type { ReactNode } from "react";
import type { Vector2D } from "@/lib/2d";
import Shop from "./shop/page";
import Project from "./project/project";

export interface DesktopItemData {
	id: string;
	name: string;
	logo: string;
	app: ReactNode;
	location: Vector2D;
	draggable: boolean;
}

const data: DesktopItemData[] = [
	{
		id: "projects",
		name: "Projects",
		logo: "/placeholder.webp",
		app: <Project />,
		location: { x: 4, y: 5 },
		draggable: true,
	},
	{
		id: "explore",
		name: "Explore",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 5, y: 4 },
		draggable: true,
	},
	{
		id: "guide",
		name: "Guides",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 4, y: 6 },
		draggable: true,
	},
	{
		id: "documentation",
		name: "Docs",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 5, y: 6 },
		draggable: true,
	},
];

export default data;

// File
// Initial position
// Can move
// Type -- determines logo and app
// Name
