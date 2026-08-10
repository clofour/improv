"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import type React from "react";
import { useActionState } from "react";
import { updateProjectAction } from "../actions";

interface EditableProps {
	name: string;
	label: string;
	value: string;
	projectId: string;
	isEditing: boolean;
	onSelect: () => void;
	onBlur: () => void;
	url?: string;
}

export function EditableField({
	name,
	label,
	value,
	projectId,
	isEditing,
	onSelect,
	onBlur,
	url,
}: EditableProps) {
	const [state, formAction, pending] = useActionState(
		updateProjectAction,
		null,
	);

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
			<p className="text-accent">"{label}": </p>
			{isEditing ? (
				<form className="flex flex-row w-full" action={formAction}>
					<input type="hidden" name="id" value={projectId} />
					<input
						name={name}
						defaultValue={value}
						autoFocus
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.currentTarget.blur();
							}
						}}
						onBlur={(e) => {
							e.target.form?.requestSubmit();
							onBlur();
						}}
						className="w-full outline-none border border-border ml-0.5 px-1"
					/>
				</form>
			) : (
				<p className="text-foreground">"{value}"</p>
			)}
			{url && (
				<ArrowSquareOutIcon
					onClick={externalClick}
					className="hover:text-primary w-6 h-6 ml-2 flex-shrink-0"
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
			<p className="text-accent">"{label}": </p>
			<p className="text-muted-foreground">"{value}"</p>
		</div>
	);
}
