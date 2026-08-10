import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import type z from "zod";
import { project } from "@/lib/db/schema";

export const CreateProjectSchema = createInsertSchema(project).omit({
	id: true,
	userId: true,
	createdAt: true,
});
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = createUpdateSchema(project).omit({
	id: true,
	userId: true,
	createdAt: true,
});
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
