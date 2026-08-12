import { create } from "zustand";
import type { Vector2D } from "@/lib/utils/2d";

export enum WindowStatus {
	Open,
	Fullscreen,
	Closed,
	Minimized,
}

interface FileState {
	location: Vector2D;
}

interface WindowState {
	status: WindowStatus;
	position: Vector2D;
	size: Vector2D;
	zIndex: number;
}

interface DesktopItemState {
	name: string;
	logo: string;

	file: FileState;
	window: WindowState;
}

interface DesktopState {
	items: Record<string, DesktopItemState>;
	selectedFiles: string[];
	topZIndex: number;

	register: (
		id: string,
		name: string,
		logo: string,
		location: Vector2D,
	) => void;
	openWindow: (id: string, isMobile: boolean) => void;
	closeWindow: (id: string) => void;
	expandWindow: (id: string) => void;
	restoreWindow: (id: string) => void;
	minimizeWindow: (id: string) => void;
	focusWindow: (id: string) => void;
	moveWindow: (id: string, position: Vector2D) => void;
	resizeWindow: (id: string, size: Vector2D) => void;

	moveFile: (id: string, position: Vector2D) => void;
	selectFiles: (fileIDs: string[]) => void;
}

export const useDesktop = create<DesktopState>((set) => ({
	items: {},
	selectedFiles: [],
	topZIndex: 0,

	register: (id, name, logo, location) => {
		set((state) => {
			const item = {
				name: name,
				logo: logo,
				window: {
					status: WindowStatus.Closed,
					position: { x: 1, y: 1 },
					size: { x: 650, y: 400 },
					zIndex: 0,
				},
				file: {
					location: location,
				},
			};

			return {
				items: {
					...state.items,
					[id]: item,
				},
			};
		});
	},
	openWindow: (id, isMobile) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const nextZIndex = state.topZIndex + 1;
			const newItem = {
				...item,
				window: {
					...window,
					status: isMobile ? WindowStatus.Fullscreen : WindowStatus.Open,
					zIndex: nextZIndex,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
				topZIndex: nextZIndex,
			};
		});
	},
	closeWindow: (id) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const newItem = {
				...item,
				window: {
					...window,
					status: WindowStatus.Closed,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},
	expandWindow: (id) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const newItem = {
				...item,
				window: {
					...window,
					status: WindowStatus.Fullscreen,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},
	restoreWindow: (id) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const newItem = {
				...item,
				window: {
					...window,
					status: WindowStatus.Open,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},
	minimizeWindow: (id) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const newItem = {
				...item,
				window: {
					...window,
					status: WindowStatus.Minimized,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},
	focusWindow: (id) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const nextZIndex = state.topZIndex + 1;
			const newItem = {
				...item,
				window: {
					...window,
					zIndex: nextZIndex,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
				topZIndex: nextZIndex,
			};
		});
	},
	moveWindow: (id, position) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const newItem = {
				...item,
				window: {
					...window,
					position: position,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},
	resizeWindow: (id, size) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const newItem = {
				...item,
				window: {
					...window,
					size: size,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},

	moveFile: (id, location) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const file = item.file;

			const newItem = {
				...item,
				file: {
					...file,
					location: location,
				},
			};

			return {
				items: {
					...state.items,
					[id]: newItem,
				},
			};
		});
	},
	selectFiles: (fileIDs) => {
		set((state) => {
			return {
				selectedFiles: fileIDs,
			};
		});
	},
}));
