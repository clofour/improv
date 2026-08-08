import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ProjectData } from "../data";
import { EditableField, ReadOnlyField } from "./editable-field";

interface ProjectEditorProps {
	data: ProjectData;
	back: () => void;
}

const TIME_UNITS = [
	{ unit: "year", seconds: 31_536_000 },
	{ unit: "month", seconds: 2_592_000 },
	{ unit: "week", seconds: 604_800 },
	{ unit: "day", seconds: 86_400 },
	{ unit: "hour", seconds: 3_600 },
	{ unit: "minute", seconds: 60 },
	{ unit: "second", seconds: 1 },
] as const;

const rtf = new Intl.RelativeTimeFormat("en", {
	style: "short",
	numeric: "auto",
});

export function relativeTime(date: Date | string | number): string {
	const elapsed = Math.round((new Date(date).getTime() - Date.now()) / 1000);
	const absElapsed = Math.abs(elapsed);

	for (const { unit, seconds } of TIME_UNITS) {
		if (absElapsed >= seconds || unit === "second") {
			return rtf.format(Math.round(elapsed / seconds), unit);
		}
	}

	return "";
}

export function ProjectEditor({ data, back }: ProjectEditorProps) {
	const [imView, setImView] = useState<boolean>(false);
	const [editing, setEditing] = useState<string>("");

	useEffect(() => {
		const disable = () => setEditing("");

		window.addEventListener("click", disable);

		return () => window.removeEventListener("click", disable);
	}, []);

	const selectField = (field: string) => {
		setImView(false);
		setEditing(field);
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-row items-center gap-2">
				<Button onClick={back}>
					<ArrowLeftIcon className="w-4 h-4" />
				</Button>
				<p className="font-heading font-bold text-2xl">Project Editor</p>
			</div>
			<div className="relative flex flex-col flex-1 w-full h-full mt-2 border border-border px-4 py-2 gap-1">
				<p className="text-base text-muted-foreground">// Project info</p>
				<ReadOnlyField label="id" value={data.id} />

				<EditableField
					label="name"
					value={data.name}
					isEditing={editing === "name"}
					onSelect={() => selectField("name")}
				/>

				<EditableField
					label="description"
					value={data.description}
					isEditing={editing === "description"}
					onSelect={() => selectField("description")}
				/>

				<EditableField
					label="url"
					value={data.url}
					isEditing={editing === "url"}
					url={data.url}
					onSelect={() => selectField("url")}
				/>

				<EditableField
					label="demo"
					value={data.demo}
					isEditing={editing === "demo"}
					url={data.demo}
					onSelect={() => selectField("demo")}
				/>

				<hr className="mt-3" />
				<div className="relative flex flex-col w-full h-full">
					<p className="text-base text-muted-foreground">// Journals</p>
					{data.logs.length > 0 ? (
						data.logs.map((log, index) => (
							<div key={`projlog-${index}`}>
								<EditableField
									label="title"
									value={log.title}
									isEditing={editing === `logtitle-${log.id}`}
									onSelect={() => selectField(`logtitle-${log.id}`)}
								/>

								<div className="flex flex-row gap-4">
									<ReadOnlyField label="time" value={log.timestamp} />
									<p className="text-muted-foreground">
										// {relativeTime(Number(log.timestamp))}
									</p>
								</div>

								<EditableField
									label="message"
									value={log.message}
									isEditing={editing === `logmsg-${log.id}`}
									onSelect={() => selectField(`logmsg-${log.id}`)}
								/>
								<hr className="mt-2 w-4" />
							</div>
						))
					) : (
						<p className="text-secondary">No logs yet :(</p>
					)}
					<Button className="absolute top-0 right-0">
						<PlusIcon className="w-4 h-4" />
					</Button>
				</div>
				<Image
					src={data.image}
					alt={data.name}
					width={125}
					height={125}
					onClick={(e) => {
						e.stopPropagation();
						setImView(!imView);
					}}
					className={`absolute top-0 right-0 ${imView ? "w-full h-full" : "w-24 h-24"} object-contain p-5 hover:bg-muted hover:cursor-pointer transition-color duration-200`}
				/>
			</div>
		</div>
	);
}
