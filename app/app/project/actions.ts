"use server";

import { errParse, ok, Result } from "@/lib/utils/result";
import { getSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createProject } from "@/lib/projects/service";

const CreateProjectFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	codeURL: z.string(),
	demoURL: z.string(),
	updateDeclaration: z.string(),
	aiDeclaration: z.string(),
});

export async function createProjectAction(
	_prev: Result<null> | null,
	data: FormData,
) {
	const session = await getSession();
	if (!session.ok) return session;

	const parse = CreateProjectFormSchema.safeParse({
		name: data.get("name"),
		description: data.get("description"),
		codeURL: data.get("codeURL"),
		demoURL: data.get("demoURL"),
		updateDeclaration: data.get("updateDeclaration"),
		aiDeclaration: data.get("aiDeclaration"),
	});
	if (!parse.success) {
		return errParse(parse);
	}

	const result = await createProject(session.data.user.id, parse.data);
	if (result.ok) {
		revalidatePath("/app/shop");
	}

	return result;
}
