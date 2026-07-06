import Terminal from "@/components/terminal";
import Section from "./section";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ShopItemPriceProps {
	className: string;
	type: string;
	price: number;
}

interface ShopItemProps {
	name: string;
	description: string;
	image: string;
	price: number;
	discountPrice: number;
	discountExamples: string[];
}

const items = [
	{
		name: "Minecraft",
		description: "the kids yearn for the mines",
		image: "/shop/minecraft.png",
		price: 70,
		discountPrice: 60,
		discountExamples: ["Minecraft Server Installer", "Managed Minecraft"],
	},
	{
		name: "ePaper Display",
		description: "monitoring, readily available on your desk",
		image: "/shop/epaper-display.png",
		price: 100,
		discountPrice: 80,
		discountExamples: [
			"Monitoring Dashboard",
			"Automatic Deployment Rollbacks",
		],
	},
	{
		name: "Cloud Credits",
		description: "you'll need these, until you don't",
		image: "/shop/cloud-credits.png",
		price: 20,
		discountPrice: 16,
		discountExamples: ["Platform as a Service", "CI/CD Pipeline"],
	},
	{
		name: "'Works on my machine' cup",
		description: "coffee first, dev never",
		image: "/shop/mug.png",
		price: 100,
		discountPrice: 80,
		discountExamples: ["Image Builder", "IaC Templates"],
	},
];

function ShopItemPrice({ className, type, price }: ShopItemPriceProps) {
	return (
		<div className={cn("p-3", className)}>
			<div className="text-xs text-muted-foreground uppercase">{type}</div>
			<div className="text-3xl font-heading font-bold">{price}</div>
		</div>
	);
}

function ShopItem({
	name,
	description,
	image,
	price,
	discountPrice,
	discountExamples,
}: ShopItemProps) {
	return (
		<Terminal className="flex flex-col" title="Shop Item">
			<div className="flex items-center justify-center aspect-[2/1] bg-background/50">
				<Image
					src={image}
					alt={name}
					width={400}
					height={300}
					className="w-full h-full object-contain p-5"
				/>
			</div>

			<div className="flex flex-col flex-1 gap-5 p-5">
				<div className="flex flex-col gap-2">
					<p className="text-xl font-heading font-bold">{name}</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="flex flex-col gap-5 mt-auto">
					<div className="grid grid-cols-2 border border-border">
						<ShopItemPrice
							className="border-r border-border"
							type="base"
							price={price}
						/>
						<ShopItemPrice
							className="bg-primary/10"
							type="relevant"
							price={discountPrice}
						/>
					</div>
					<div className="flex flex-row flex-wrap items-center gap-2">
						<span className="text-xs text-muted-foreground uppercase whitespace-nowrap">
							Example Projects:
						</span>
						{discountExamples.map((example) => (
							<span
								key={example}
								className="px-2 py-1 bg-muted/50 border border-border text-xs text-muted-foreground"
							>
								{example}
							</span>
						))}
					</div>
				</div>
			</div>
		</Terminal>
	);
}

export default function Prizes() {
	return (
		<Section
			id="prizes"
			title="what you get"
			description={
				<span>
					once your ship is reviewed, you'll receive uptime depending on the
					complexity and hours spent on your project. you can spend uptime in
					the shop. there's just one catch:{" "}
					<span className="text-foreground">
						items relevant to your projects are discounted
					</span>
					.
				</span>
			}
		>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{items.map((item) => (
						<ShopItem key={item.name} {...item} />
					))}
				</div>
				<p className="text-sm text-muted-foreground">...and more</p>
			</div>
		</Section>
	);
}
