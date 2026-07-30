import { ReactNode } from "react";
import Example from "./_components/example";
import { Vector2D } from "./_components/desktop";

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
		id: "hello",
		name: "Hello",
		logo: "/placeholder.webp",
		app: <Example />,
		position: { x: 0, y: 0 },
		draggable: true,
	},
];

export default data;

// File
// Initial position
// Can move
// Type -- determines logo and app
// Name
