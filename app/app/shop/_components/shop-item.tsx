"use client";

import Image from "next/image";
import { useActionState } from "react";
import Panel from "@/components/panel";
import { Button } from "@/components/ui/button";
import { createOrderAction } from "../actions";

interface ShopItemProps {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
	discountPrice?: number;
}

export default function ShopItem({
	id,
	name,
	description,
	image,
	price,
	discountPrice,
}: ShopItemProps) {
	const [state, formAction, pending] = useActionState(createOrderAction, null);

	return (
		<Panel className="flex flex-col">
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
						{price}
						{discountPrice}
					</div>
					<form action={formAction}>
						<input type="hidden" name="itemId" value={id} />
						<input type="hidden" name="quantity" value={1} />
						<Button type="submit" disabled={pending}>
							{!pending ? "Redeem" : "Redeeming"}
						</Button>
					</form>
				</div>
			</div>
		</Panel>
	);
}
