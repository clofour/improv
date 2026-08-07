import { db } from "@/lib/db";
import { CreateOrderInput } from "./schema";
import { order } from "@/lib/db/schema";

export async function createOrder(input: CreateOrderInput) {
	return db.insert(order).values(input);
}
