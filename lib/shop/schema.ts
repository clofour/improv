import z from "zod";
import { createInsertSchema } from "drizzle-zod";
import { order } from "@/lib/db/schema";

export const CreateOrderSchema = createInsertSchema(order).omit({
	id: true,
	userId: true,
	createdAt: true,
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
