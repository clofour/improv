export interface ProjectLog {
	id: string;
	title: string;
	message: string;
	timestamp: string;
}

export interface ProjectData {
	id: string;
	timestamp: string;
	name: string;
	description: string;
	image: string;
	url: string;
	demo: string;
	logs: ProjectLog[];
}

const data: ProjectData[] = [
	{
		id: "proj1",
		timestamp: "1021020110",
		name: "Improv YSWS",
		description: "A provisioning service focused YSWS",
		image: "/shop/mug.png",
		url: "https://github.com/clofour/improv",
		demo: "https://improv-silk.vercel.app/",
		logs: [],
	},
];

export default data;
