import Image from "next/image";
import Terminal from "@/components/terminal";
import { cn } from "@/lib/utils/class";
import Tag from "./tag";
import { projects } from "./prizes";

interface ShopItemPriceProps {
	className: string;
	type: string;
	price: number;
}

function ShopItemPrice({ className, type, price }: ShopItemPriceProps) {
	return (
		<div className={cn("p-3", className)}>
			<div className="text-xs text-muted-foreground uppercase">{type}</div>
			<div className="text-3xl font-heading font-bold">{price}</div>
		</div>
	);
}

interface ShopItemProps {
	name: string;
	description: string;
	image: string;
	basePrice: number;
	discountPrice: number;
	tags: string[];
	projectId: string;
}

export function ShopItem({
	name,
	description,
	image,
	basePrice,
	discountPrice,
	tags,
	projectId,
}: ShopItemProps) {
	const project = projects.find((p) => p.value === projectId) ?? projects[0];
	const isDiscount = project.tags.some((tag) => tags.includes(tag));

	const activeStyling = "bg-primary/10";

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
							className={`border-r border-border ${isDiscount ? "" : activeStyling}`}
							type="base"
							price={basePrice}
						/>
						<ShopItemPrice
							className={`${isDiscount ? activeStyling : ""}`}
							type="relevant"
							price={discountPrice}
						/>
					</div>
					<div className="flex flex-row flex-wrap items-center gap-2">
						<span className="text-xs text-muted-foreground uppercase whitespace-nowrap">
							Tags:
						</span>
						{tags.map((tag) => (
							<Tag
								className={
									project.tags.includes(tag)
										? "text-foreground bg-primary/50"
										: ""
								}
								key={tag}
							>
								{tag}
							</Tag>
						))}
					</div>
				</div>
			</div>
		</Terminal>
	);
}
