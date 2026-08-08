import React from "react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

interface EditableProps {
	label: string;
	value: string;
	isEditing: boolean;
	onSelect: () => void;
	url?: string;
}

export function EditableField({
	label,
	value,
	isEditing,
	onSelect,
	url,
}: EditableProps) {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSelect();
	};

	const externalClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (url) {
			window.open(url, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<div
			className="flex flex-row items-center hover:cursor-pointer"
			onClick={handleClick}
		>
			<p className="text-[var(--accent)]">"{label}": </p>
			{isEditing ? (
				<form
					className="flex flex-row w-full"
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						defaultValue={value}
						autoFocus
						className="w-full outline-none border border-[var(--border)] ml-0.5 px-1"
					/>
				</form>
			) : (
				<p className="text-[var(--foreground)]">"{value}"</p>
			)}
			{url && (
				<ArrowSquareOutIcon
					onClick={externalClick}
					className="hover:text-[var(--primary)] w-6 h-6 ml-2 flex-shrink-0"
				/>
			)}
		</div>
	);
}

export function ReadOnlyField({
	label,
	value,
}: {
	label: string;
	value: string;
}) {
	return (
		<div className="flex flex-row">
			<p className="text-[var(--accent)]">"{label}": </p>
			<p className="text-[var(--muted-foreground)]">"{value}"</p>
		</div>
	);
}
