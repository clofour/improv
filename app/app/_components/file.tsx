import { FileData } from "../data";

export default function File({ name, logo, app, pos, draggable }: FileData) {
	return (
		<div>
			{name}
			{logo}
			{app}
			{pos}
			{draggable}
		</div>
	);
}
