import { db } from "@/lib/db";
import {
	CreateProjectInput,
	CreateProjectSchema,
	UpdateProjectInput,
	UpdateProjectSchema,
} from "./schema";
import { project } from "@/lib/db/schema";
import { err, errParse, ok, Result } from "@/lib/utils/result";
import { and, eq, InferSelectModel } from "drizzle-orm";

type SelectProject = InferSelectModel<typeof project>;

export async function listProjects(
	userId: string,
): Promise<Result<SelectProject[]>> {
	try {
		const result = await db
			.select()
			.from(project)
			.where(eq(project.userId, userId));
		return ok(result);
	} catch (e) {
		return err(["Failed to create project"]);
	}
}

export async function getProject(
	userId: string,
	projectId: string,
): Promise<Result<SelectProject>> {
	try {
		const [result] = await db
			.select()
			.from(project)
			.where(and(eq(project.userId, userId), eq(project.id, projectId)))
			.limit(1);
		return ok(result);
	} catch (e) {
		return err(["Failed to delete project"]);
	}
}

export async function createProject(
	userId: string,
	input: CreateProjectInput,
): Promise<Result<null>> {
	const parse = CreateProjectSchema.safeParse(input);
	if (!parse.success) return errParse(parse);

	const data = {
		...input,
		userId: userId,
	};

	try {
		await db.insert(project).values(data);
		return ok(null);
	} catch (e) {
		return err(["Failed to create project"]);
	}
}

export async function updateProject(
	userId: string,
	projectId: string,
	input: UpdateProjectInput,
): Promise<Result<null>> {
	const parse = UpdateProjectSchema.safeParse(input);
	if (!parse.success) return errParse(parse);

	try {
		await db
			.update(project)
			.set(parse.data)
			.where(and(eq(project.userId, userId), eq(project.id, projectId)));
		return ok(null);
	} catch (e) {
		return err(["Failed to update project"]);
	}
}

export async function deleteProject(
	userId: string,
	projectId: string,
): Promise<Result<null>> {
	try {
		await db
			.delete(project)
			.where(and(eq(project.userId, userId), eq(project.id, projectId)));
		return ok(null);
	} catch (e) {
		return err(["Failed to delete project"]);
	}
}
