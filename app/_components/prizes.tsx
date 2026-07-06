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
		<Terminal title="Shop Item">
			<div className="flex items-center justify-center aspect-[2/1]">
				<Image
					src={image}
					alt={name}
					width={400}
					height={300}
					className="w-full h-full object-contain p-5"
				/>
			</div>

			<div className="flex flex-col gap-5 p-5">
				<div className="flex flex-col gap-2">
					<p className="text-xl font-heading font-bold">{name}</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
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
		</Terminal>
	);
}

export default function Prizes() {
	const items = [
		{
			name: "Minecraft",
			description: "the kids yearn for the mines",
			image: "/placeholder.webp",
			price: 70,
			discountPrice: 60,
			discountExamples: ["Minecraft server installer"],
		},
		{
			name: "ePaper Display",
			description: "monitoring, readily available on your desk",
			image: "/placeholder.webp",
			price: 100,
			discountPrice: 80,
			discountExamples: ["GPU scheduler"],
		},
		{
			name: "Hosting Credits",
			description: "you'll need these, until you don't",
			image: "/placeholder.webp",
			price: 20,
			discountPrice: 16,
			discountExamples: ["PaaS"],
		},
		{
			name: "'Works on my machine' cup",
			description: "coffee first, dev never",
			image: "/placeholder.webp",
			price: 100,
			discountPrice: 80,
			discountExamples: ["GPU scheduler"],
		},
	];

	return (
		<Section
			id="prizes"
			title="what you get"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{items.map((item) => (
					<ShopItem key={item.name} {...item} />
				))}
			</div>
		</Section>
	);
}
