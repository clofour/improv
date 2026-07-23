import { create } from "zustand";

export enum WindowStatus {
	Open,
	Closed,
	Minimized,
}

interface WindowState {
	status: WindowStatus;
	zIndex: number;
}

interface DesktopState {
	windows: Record<string, WindowState>;
	topZIndex: number;
	register: (id: string) => void;
	open: (id: string) => void;
	close: (id: string) => void;
}

export const useDesktop = create<DesktopState>((set) => ({
	windows: {},
	topZIndex: 0,

	register: (id) => {
		set((state) => {
			const window = {
				status: WindowStatus.Closed,
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
}));
