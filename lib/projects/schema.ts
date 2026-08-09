import z from "zod";
import { createInsertSchema } from "drizzle-zod";
import { project } from "@/lib/db/schema";

export const CreateProjectSchema = createInsertSchema(project).omit({
	id: true,
	userId: true,
	createdAt: true,
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
