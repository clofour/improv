import Image from "next/image";
import Panel from "@/components/panel";
import { Button } from "@/components/ui/button";
import { ProjectData } from "../data";
import { relativeTime } from "./editor";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { Discounted } from "./tags";

export default function ProjItem({
	id,
	timestamp,
	name,
	description,
	image,
	url,
	demo,
	logs,
	view,
}: ProjectData & { view: () => void }) {
	return (
		<Panel className="flex flex-row w-full px-2 py-1 items-center">
			<Image
				src={image}
				alt={name}
				width={125}
				height={125}
				className={`my-4 mx-2 w-24 h-auto`}
			/>
			<div className="flex flex-col px-4 w-full h-full py-6 gap-0.5">
				<div className="flex flex-row items-center gap-4">
					<p className="text-2xl font-heading font-bold w-fit">{name}</p>
					<Discounted />
				</div>
				<p className="text-sm text-muted-foreground mt-0.5 w-fit">
					{description}
				</p>
				<p className="text-sm text-accent">{relativeTime(Number(timestamp))}</p>
				<Button className="w-fit mt-1" onClick={view}>
					<ArrowSquareOutIcon className="w-4 h-4 mr-1" />
					View Project
				</Button>
			</div>
		</Panel>
	);
}
