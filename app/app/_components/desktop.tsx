import { create } from "zustand";

export enum WindowStatus {
	Open,
	Closed,
	Minimized,
}

export type Position = { x: number; y: number };

interface WindowState {
	status: WindowStatus;
	position: Position;
	zIndex: number;
}

interface DesktopState {
	windows: Record<string, WindowState>;
	topZIndex: number;
	register: (id: string) => void;
	open: (id: string) => void;
	close: (id: string) => void;
	minimize: (id: string) => void;
	focus: (id: string) => void;
	move: (id: string, position: Position) => void;
}

export const useDesktop = create<DesktopState>((set) => ({
	windows: {},
	topZIndex: 0,

	register: (id) => {
		set((state) => {
			const window = {
				status: WindowStatus.Closed,
				position: { x: 1, y: 1 },
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
}));
