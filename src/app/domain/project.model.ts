export interface Project {
	id: string;
	name: string;
	desc?: string;
	coverImg: string; // 图片路径
	taskLists?: string[];
	members?: string[];
}
