"use server";

import { err } from "@/lib/result";
import { CreateOrderSchema } from "@/lib/shop/schema";
import { createOrder } from "@/lib/shop/service";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createOrderAction(data: FormData) {
	const parse = CreateOrderSchema.safeParse({
		itemId: data.get("itemId"),
		quantity: data.get("quantity"),
	});
	if (!parse.success) {
		return err(parse.error.issues.map((i) => i.message));
	}

	await createOrder(parse.data);
	revalidatePath("/api/orders");
}
