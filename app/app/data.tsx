import { ReactNode } from "react";
import Example from "./_components/example";

export interface FileData {
	name: string;
	logo: string;
	app: ReactNode;
	pos: [number, number];
	draggable: boolean;
}

const data: FileData[] = [
	{
		name: "Hello",
		logo: "/placeholder.webp",
		app: <Example />,
		pos: [1, 2],
		draggable: true,
	},
];

export default data;

// File
// Initial position
// Can move
// Type -- determines logo and app
// Name
