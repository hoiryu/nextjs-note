// Session 에서 얻을 수 있는 사용자에 대한 정보를 정의
export type User = {
	name: string;
	username: string;
	email: string;
	image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

// User Intersection Type 정의
export type DetailUser = User & {
	following: SimpleUser[];
	followers: SimpleUser[];
	bookmarks: string[];
};
