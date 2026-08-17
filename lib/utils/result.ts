import type { ZodSafeParseResult } from "zod";

type Success<T> = {
	ok: true;
	data: T;
};
type Failure = {
	ok: false;
	errors: string[];
};

export type Result<T> = Success<T> | Failure;

export function ok<T>(data: T): Success<T> {
	return {
		ok: true,
		data: data,
	};
}

export function err(errors: string[]): Failure {
	return {
		ok: false,
		errors: errors,
	};
}

export function errParse(parse: ZodSafeParseResult<any>): Failure {
	if (parse.success)
		throw new Error("errParse called with successful parse result.");

	return err(parse.error.issues.map((i) => i.message));
}
