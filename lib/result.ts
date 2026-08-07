type Success<T> =
	| {
			ok: true;
			data: T;
	  }
	| { ok: true };
type Failure = {
	ok: false;
	errors: string[];
	data: never;
};

export type Result<T> = Success<T> | Failure;

export function ok<T>(data: T) {
	return {
		ok: true,
		data: data,
	};
}

export function err(errors: string[]) {
	return {
		ok: false,
		errors: errors,
	};
}
