import { db } from "@/lib/db";
import { CreateProjectInput, CreateProjectSchema } from "./schema";
import { project } from "@/lib/db/schema";
import { err, errParse, ok, Result } from "@/lib/utils/result";

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
		return err(["Failed to create order"]);
	}
}
