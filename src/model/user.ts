import { client } from '@/service/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Session 에서 얻을 수 있는 사용자에 대한 정보를 정의
export type AuthUser = {
	id: string;
	name: string;
	username: string;
	email: string;
	image?: string;
};

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

// User Intersection Type 정의
export type HomeUser = AuthUser & {
	following: SimpleUser[];
	followers: SimpleUser[];
	bookmarks: string[];
};

export type SearchUser = AuthUser & {
	following: number;
	followers: number;
};

export type ProfileUser = SearchUser & {
	posts: number;
};

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
	return builder.image(source).width(800).url();
}
