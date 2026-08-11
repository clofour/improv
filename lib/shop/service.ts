import { db } from "@/lib/db";
import { order } from "@/lib/db/schema";
import { err, errParse, ok, type Result } from "@/lib/utils/result";
import { type CreateOrderInput, CreateOrderSchema } from "./schema";

export async function createOrder(
	userId: string,
	input: CreateOrderInput,
): Promise<Result<null>> {
	const parse = CreateOrderSchema.safeParse(input);
	if (!parse.success) return errParse(parse);

	const data = {
		...input,
		userId: userId,
	};

	try {
		await db.insert(order).values(data);
		return ok(null);
	} catch (e) {
		return err(["Failed to create order"]);
	}
}
