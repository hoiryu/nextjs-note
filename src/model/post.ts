export type Comment = {
	comment: string;
	username: string;
	image?: string | undefined;
};

// 리스트에서 사용
// 실제로는 간단하게 사용하기 때문에 Omit 으로 심플하게 변경
// intersection
export type SimplePost = Omit<FullPost, 'comments'> & {
	comments: number;
};

// 상세에서 사용
export type FullPost = {
	id: string;
	username: string;
	userImage: string;
	image: string;
	text: string;
	createdAt: string;
	likes: string[];
	comments: Comment[];
};
