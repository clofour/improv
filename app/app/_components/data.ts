export type Vec3 = [number, number, number];

interface MonitorData {
	name: string;
	position: Vec3;
	rotation: Vec3;
}

const monitors: MonitorData[] = [
	{
		name: "hello",
		position: [-3, 1.5, 0],
		rotation: [0, 0.3, 0],
	},
	{
		name: "hello2",
		position: [3, 1.5, 0],
		rotation: [0, -0.3, 0],
	},
];

export default monitors;
