import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { order } from "@/lib/db/schema";

export const CreateOrderSchema = createInsertSchema(order).omit({
	id: true,
	userId: true,
	createdAt: true,
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
