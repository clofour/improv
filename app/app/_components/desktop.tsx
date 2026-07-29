import { create } from "zustand";

export enum WindowStatus {
	Open,
	Fullscreen,
	Closed,
	Minimized,
}

export type Vector2D = { x: number; y: number };

interface WindowState {
	status: WindowStatus;
	position: Vector2D;
	size: Vector2D;
	zIndex: number;
}

interface DesktopState {
	windows: Record<string, WindowState>;
	topZIndex: number;
	register: (id: string) => void;
	open: (id: string) => void;
	close: (id: string) => void;
	expand: (id: string) => void;
	minimize: (id: string) => void;
	focus: (id: string) => void;
	move: (id: string, position: Vector2D) => void;
	resize: (id: string, size: Vector2D) => void;
}

export const useDesktop = create<DesktopState>((set) => ({
	windows: {},
	topZIndex: 0,

	register: (id) => {
		set((state) => {
			const window = {
				status: WindowStatus.Closed,
				position: { x: 1, y: 1 },
				size: { x: 100, y: 100 },
				zIndex: 0,
			};

			return {
				windows: {
					...state.windows,
					[id]: window,
				},
			};
		});
	},

	open: (id) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const nextZIndex = state.topZIndex + 1;
			const newWindow = {
				...currentWindow,
				status: WindowStatus.Open,
				zIndex: nextZIndex,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
				topZIndex: nextZIndex,
			};
		});
	},

	close: (id) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const newWindow = {
				...currentWindow,
				status: WindowStatus.Closed,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
			};
		});
	},

	expand: (id) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const newWindow = {
				...currentWindow,
				status: WindowStatus.Fullscreen,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
			};
		});
	},

	minimize: (id) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const newWindow = {
				...currentWindow,
				status: WindowStatus.Minimized,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
			};
		});
	},

	focus: (id) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const nextZIndex = state.topZIndex + 1;
			const newWindow = {
				...currentWindow,
				zIndex: nextZIndex,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
				topZIndex: nextZIndex,
			};
		});
	},

	move: (id, position) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const newWindow = {
				...currentWindow,
				position: position,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
			};
		});
	},

	resize: (id, size) => {
		set((state) => {
			const currentWindow = state.windows[id];
			if (!currentWindow) return state;

			const newWindow = {
				...currentWindow,
				size: size,
			};

			return {
				windows: {
					...state.windows,
					[id]: newWindow,
				},
			};
		});
	},
}));
