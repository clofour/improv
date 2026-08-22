import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import type z from "zod";
import { project } from "@/lib/db/schema";

export const CreateProjectSchema = createInsertSchema(project).omit({
	id: true,
	userId: true,
	shipState: true,
	createdAt: true,
});
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = createUpdateSchema(project).omit({
	id: true,
	userId: true,
	shipState: true,
	createdAt: true,
});
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;

export const UpdateProjectShipState = createUpdateSchema(project)
	.pick({
		shipState: true,
	})
	.required({
		shipState: true,
	});
export type UpdateProjectShipStateInput = z.infer<
	typeof UpdateProjectShipState
>;
