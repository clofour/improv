import { create } from "zustand";

export enum WindowStatus {
	Open,
	Fullscreen,
	Closed,
	Minimized,
}

export type Vector2D = { x: number; y: number };

interface FileState {
	position: Vector2D;
	draggable: boolean;
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
	topZIndex: number;
	register: (
		id: string,
		name: string,
		logo: string,
		filePosition: Vector2D,
	) => void;
	openWindow: (id: string) => void;
	closeWindow: (id: string) => void;
	expandWindow: (id: string) => void;
	minimizeWindow: (id: string) => void;
	focusWindow: (id: string) => void;
	moveWindow: (id: string, position: Vector2D) => void;
	resizeWindow: (id: string, size: Vector2D) => void;
	moveFile: (id: string, position: Vector2D) => void;
}

export const useDesktop = create<DesktopState>((set) => ({
	items: {},
	topZIndex: 0,

	register: (id, name, logo, filePosition) => {
		set((state) => {
			const item = {
				name: name,
				logo: logo,
				window: {
					status: WindowStatus.Closed,
					position: { x: 1, y: 1 },
					size: { x: 100, y: 100 },
					zIndex: 0,
				},
				file: {
					position: filePosition,
					draggable: true,
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

	openWindow: (id) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const window = item.window;

			const nextZIndex = state.topZIndex + 1;
			const newItem = {
				...item,
				window: {
					...window,
					status: WindowStatus.Open,
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

	moveFile: (id, position) => {
		set((state) => {
			const item = state.items[id];
			if (!item) return state;

			const file = item.file;

			const newItem = {
				...item,
				file: {
					...file,
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
}));
