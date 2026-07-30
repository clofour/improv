import { ReactNode } from "react";
import Example from "./_components/example";
import { Vector2D } from "./_components/desktop";
import Shop from "./shop/page";

export interface DesktopItemData {
	id: string;
	name: string;
	logo: string;
	app: ReactNode;
	position: Vector2D;
	draggable: boolean;
}

const data: DesktopItemData[] = [
	{
		id: "shop",
		name: "Shop",
		logo: "/placeholder.webp",
		app: <Shop />,
		pos: { x: 0, y: 0 },
		draggable: true,
	},
];

export default data;

// File
// Initial position
// Can move
// Type -- determines logo and app
// Name
