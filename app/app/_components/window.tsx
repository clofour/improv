import Terminal from "@/components/terminal";
import { ReactNode } from "react";
import { create } from "zustand";

const useWindows = create((set) => ({}));

interface WindowProps {
	name: string;
	children: ReactNode;
}

export default function Window({ name, children }: WindowProps) {
	return <Terminal title={name}>{children}</Terminal>;
}
