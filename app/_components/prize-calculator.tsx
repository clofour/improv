import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
	calculateBaseReward,
	calculateDiscountReward,
} from "@/lib/helpers/prize";
import { projects } from "./prizes";

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
		<div className="flex flex-col gap-3 pb-8 border-b border-border">
			<div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-3">
				<Select
					items={projects}
					value={projectId}
					onValueChange={(newProjectId) =>
						newProjectId !== null ? setProjectId(newProjectId) : null
					}
				>
					<SelectTrigger className="h-auto! p-0 gap-1 border-0 bg-transparent text-base text-foreground underline decoration-dashed decoration-primary/60 underline-offset-4 hover:text-primary">
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
				<div className="flex flex-row items-center gap-3">
					<div className="w-40 sm:w-48">
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
					</div>
					<span className="w-10 text-right font-mono text-sm text-muted-foreground">
						{length}h
					</span>
				</div>
			</div>
			<p className="text-base text-muted-foreground">
				you'd earn{" "}
				<span className="font-semibold text-primary">
					{calculateBaseReward(project.type, length)} uptime
				</span>{" "}
				and{" "}
				<span className="font-semibold text-primary">
					{calculateDiscountReward(project.type, length)} discount vouchers
				</span>
			</p>
		</div>
	);
}
