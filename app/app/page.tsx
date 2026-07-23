import File from "./_components/file";
import data from "./data";

export default function App() {
	return (
		<div className="min-w-screen min-h-screen p-4">
			{data.map((file) => (
				<File key={file.name} {...file} />
			))}
		</div>
	);
}
