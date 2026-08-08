"use server";

import { errParse, ok } from "@/lib/utils/result";
import { getSession } from "@/lib/auth/session";
import { CreateOrderSchema } from "@/lib/shop/schema";
import { createOrder } from "@/lib/shop/service";
import { revalidatePath } from "next/cache";
import z from "zod";

const CreateOrderFormSchema = z.object({
	itemId: z.string(),
	quantity: z.coerce.number(),
});

export async function createOrderAction(data: FormData) {
	const session = await getSession();
	if (!session.ok) return session;

	const parse = CreateOrderFormSchema.safeParse({
		itemId: data.get("itemId"),
		quantity: data.get("quantity"),
	});
	if (!parse.success) {
		return errParse(parse);
	}

	const result = await createOrder(session.data.user.id, parse.data);
	if (result.ok) return revalidatePath("/app/shop");

	return result;
}
