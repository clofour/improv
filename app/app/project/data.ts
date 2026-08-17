export interface ProjectLog {
	id: string;
	title: string;
	message: string;
	timestamp: string;
}

export interface ProjectData {
	id: string;
	name: string;
	description: string;
	image: string;
	codeURL: string;
	demoURL: string;
	shipState: boolean;
	createdAt: string;
	logs: ProjectLog[];
}

const data: ProjectData[] = [
	{
		id: "proj1",
		createdAt: "1021020110",
		name: "Improv YSWS",
		description: "A provisioning service focused YSWS",
		image: "/shop/mug.png",
		codeURL: "https://github.com/clofour/improv",
		demoURL: "https://improv-silk.vercel.app/",
		logs: [],
	},
];

export default data;
