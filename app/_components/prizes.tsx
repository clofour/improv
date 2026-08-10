"use client";

import { useState } from "react";
import { calculateBasePrice, calculateDiscount } from "@/lib/helpers/discount";
import { ProjectType } from "@/lib/helpers/project";
import { clamp } from "@/lib/utils/general";
import NameSection from "./name-section";
import PrizeCalculator from "./prize-calculator";
import { ShopItem } from "./shop-item";

export const items = [
	{
		name: "Minecraft",
		description: "the kids yearn for the mines",
		image: "/shop/minecraft.png",
		basePrice: calculateBasePrice(35),
		tags: ["games"],
	},
	{
		name: "ePaper Display",
		description: "monitoring, readily available on your desk",
		image: "/shop/epaper-display.png",
		basePrice: calculateBasePrice(50),
		tags: ["monitoring"],
	},
	{
		name: "Cloud Credits",
		description: "you'll need these, until you don't",
		image: "/shop/cloud-credits.png",
		basePrice: calculateBasePrice(25),
		tags: ["hosting"],
	},
	{
		name: "'Works on my machine' cup",
		description: "coffee first, dev never",
		image: "/shop/mug.png",
		basePrice: calculateBasePrice(10),
		tags: ["reproducibility"],
	},
];

export const projects = [
	{
		value: "paas",
		label: "PaaS",
		type: ProjectType.Advanced,
		tags: ["hosting"],
	},
	{
		value: "minecraft",
		label: "Managed Minecraft",
		type: ProjectType.Advanced,
		tags: ["games", "hosting"],
	},
	{
		value: "homelab",
		label: "Homelab Setup Manifests",
		type: ProjectType.Beginner,
		tags: ["reproducibility"],
	},
	{
		value: "orchestrator",
		label: "Container Orchestrator",
		type: ProjectType.Advanced,
		tags: ["hosting"],
	},
];

export default function Prizes() {
	const [projectId, setProjectId] = useState("paas");
	const [length, setLength] = useState(20);

	const project = projects.find((p) => p.value === projectId) ?? projects[0];
	const discount = calculateDiscount(project.type, length);

	return (
		<NameSection
			id="prizes"
			title="what you get"
			description={
				<div className="space-y-4">
					<p>
						ship your project, and earn uptime + discount vouchers depending on
						the size. spend uptime in the shop. there's just one catch:{" "}
						<span className="text-foreground">
							items relevant to your projects are discounted
						</span>
						.
					</p>

					<p>
						oh, and the tools you build?{" "}
						<span className="text-foreground">you can use them!</span> use your
						own PaaS, and pay 16x less. use your own provisioner, and cut down
						waiting times. not bad at all, huh?
					</p>
				</div>
			}
		>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{items.map((item) => (
						<ShopItem
							key={item.name}
							discountPrice={clamp(item.basePrice - discount, 0, 10000)}
							projectId={projectId}
							{...item}
						/>
					))}
				</div>
				<PrizeCalculator
					projectId={projectId}
					setProjectId={setProjectId}
					length={length}
					setLength={setLength}
				/>
				<p className="text-sm text-muted-foreground">...tip of the iceberg</p>
			</div>
		</NameSection>
	);
}
