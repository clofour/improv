"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { getSession } from "@/lib/auth/session";
import { createOrder } from "@/lib/shop/service";
import { errParse, ok, type Result } from "@/lib/utils/result";

const CreateOrderFormSchema = z.object({
	itemId: z.string(),
	quantity: z.coerce.number(),
});

export async function createOrderAction(
	_prev: Result<null> | null,
	data: FormData,
) {
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
	if (result.ok) {
		revalidatePath("/app/shop");
	}

	return result;
}
