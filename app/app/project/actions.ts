"use server";

import { errParse, ok, Result } from "@/lib/utils/result";
import { getSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createProject, updateProject } from "@/lib/projects/service";
import extract from "@/lib/utils/form";

const CreateProjectFormSchema = z.object({
	name: z.string().nullish(),
	description: z.string().nullish(),
	codeURL: z.string().nullish(),
	demoURL: z.string().nullish(),
	updateDeclaration: z.string().nullish(),
	aiDeclaration: z.string().nullish(),
});

export async function createProjectAction(
	_prev: Result<null> | null,
	data: FormData,
) {
	const session = await getSession();
	if (!session.ok) return session;

	const parse = CreateProjectFormSchema.safeParse(extract(data));
	if (!parse.success) {
		console.log("here");
		return errParse(parse);
	}

	const result = await createProject(session.data.user.id, parse.data);
	if (result.ok) {
		revalidatePath("/app/project");
	}

	return result;
}

const UpdateProjectFormSchema = z.object({
	id: z.uuid(),

	name: z.string().optional(),
	description: z.string().optional(),
	codeURL: z.string().optional(),
	demoURL: z.string().optional(),
	updateDeclaration: z.string().optional(),
	aiDeclaration: z.string().optional(),
});

export async function updateProjectAction(
	_prev: Result<null> | null,
	data: FormData,
) {
	const session = await getSession();
	if (!session.ok) return session;

	const parse = UpdateProjectFormSchema.safeParse(extract(data));
	if (!parse.success) {
		return errParse(parse);
	}

	const result = await updateProject(
		session.data.user.id,
		parse.data.id,
		parse.data,
	);
	if (result.ok) {
		revalidatePath("/app/project");
	}

	return result;
}
