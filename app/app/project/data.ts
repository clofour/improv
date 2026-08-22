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
