import Image from "next/image";
import { projects } from "./prizes";
import Tag from "./tag";

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

	return (
		<div className="flex flex-col gap-5">
			<div className="relative aspect-[2/1]">
				<Image
					src={image}
					alt={name}
					width={400}
					height={300}
					className="absolute inset-0 w-full h-full object-contain p-4"
				/>
			</div>

			<div className="flex flex-col flex-1 gap-4">
				<div className="flex flex-col gap-1">
					<p className="text-xl font-heading font-bold">{name}</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="flex flex-row flex-wrap items-end justify-between gap-2 mt-auto pt-2">
					<p className="flex items-baseline gap-2 font-heading">
						{isDiscount && (
							<span className="text-muted-foreground line-through">
								{basePrice}
							</span>
						)}
						<span className="text-3xl font-bold">
							{isDiscount ? discountPrice : basePrice}
						</span>
						<span className="text-sm text-muted-foreground">uptime</span>
					</p>
					<div className="flex flex-row flex-wrap gap-2">
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
		</div>
	);
}
