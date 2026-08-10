import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Terminal from "@/components/terminal";
import { projects } from "./prizes";
import Tag from "./tag";

interface PrizeDemoProps {
	projectId: string;
	setProjectId: (projectId: string) => void;
	length: number;
	setLength: (length: number) => void;
}

export default function PrizeCalculator({
	projectId,
	setProjectId,
	length,
	setLength,
}: PrizeDemoProps) {
	const project = projects.find((p) => p.value === projectId) ?? projects[0];

	return (
		<Terminal title="Demo">
			<div className="flex flex-col p-2 gap-4">
				<div className="flex flex-row justify-center items-center gap-4">
					<Slider
						value={length}
						onValueChange={(newLength) => {
							if (typeof newLength == "number") {
								setLength(newLength);
							}
						}}
						min={1}
						max={100}
						step={1}
					/>
					<div className="">{length}h</div>
				</div>

				<div className="flex flex-row flex-wrap items-center gap-4">
					<Select
						items={projects}
						value={projectId}
						onValueChange={(newProjectId) =>
							newProjectId !== null ? setProjectId(newProjectId) : null
						}
					>
						<SelectTrigger className="w-full sm:w-[250px]">
							<SelectValue placeholder="Theme" />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectGroup>
								{projects.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<div>{project.type}</div>
					<div className="flex flex-row gap-2">
						{project.tags.map((example) => (
							<Tag key={example}>{example}</Tag>
						))}
					</div>
				</div>
			</div>
		</Terminal>
	);
}
