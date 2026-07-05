import Terminal from "@/components/terminal";
import Section from "./section";
import Image from "next/image";

interface ShopItemProps {
	name: string;
	description: string;
	image: string;
	price: number;
	discountPrice: number;
	discountReason: string;
}

function ShopItem({
	name,
	description,
	image,
	price,
	discountPrice,
	discountReason,
}: ShopItemProps) {
	return (
		<Terminal title={name}>
			<div className="flex items-center justify-center aspect-[2/1]">
				<Image
					src={image}
					alt={name}
					width={400}
					height={300}
					className="w-full h-full object-contain p-5"
				/>
			</div>

			<p>{name}</p>
			<p>{description}</p>
			<div className="flex flex-row gap-2">
				<p>
					<span className="text-4xl">{price}</span>{" "}
					<span className="text-sm text-muted-foreground">uptime</span>
				</p>
				<p>{discountPrice}</p>
				<p>if you build a {discountReason}</p>
			</div>
		</Terminal>
	);
}

export default function Prizes() {
	const items = [
		{
			name: "Hosting Credits",
			description: "",
			image: "/placeholder.webp",
			price: 20,
			discountPrice: 16,
			discountReason: "PaaS",
		},
		{
			name: "Minecraft",
			description: "",
			image: "/placeholder.webp",
			price: 70,
			discountPrice: 60,
			discountReason: "Minecraft server installer",
		},
		{
			name: "GPU Grant",
			description: "",
			image: "/placeholder.webp",
			price: 100,
			discountPrice: 80,
			discountReason: "GPU scheduler",
		},
	];

	return (
		<Section
			id="prizes"
			title="what you get"
			description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id."
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{items.map((item) => (
					<ShopItem key={item.name} {...item} />
				))}
			</div>
		</Section>
	);
}
