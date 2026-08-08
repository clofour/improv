import { db } from "@/lib/db";
import { CreateOrderInput, CreateOrderSchema } from "./schema";
import { order } from "@/lib/db/schema";
import { err, errParse, ok, Result } from "@/lib/utils/result";

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
