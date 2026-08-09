export default function extract(data: FormData) {
	return Object.fromEntries(data.entries());
}
