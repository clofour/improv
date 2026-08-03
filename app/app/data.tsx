import { ReactNode } from "react";
import Shop from "./shop/page";
import { Vector2D } from "@/lib/2d";

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
		id: "shop",
		name: "Shop",
		logo: "/placeholder.webp",
		app: <Shop />,
		location: { x: 0, y: 0 },
		draggable: true,
	},
];

export default data;

// File
// Initial position
// Can move
// Type -- determines logo and app
// Name
