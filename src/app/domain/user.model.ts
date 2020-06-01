/**
 * @Description: 用户领域类
 */
export interface User {
	id?: string;
	emain: string;
	password: string;
	name: string;
	avatar: string;
	projectIds: string[];
}
