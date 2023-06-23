import { client } from './sanity';

export type OAuthUser = {
	id: string;
	email: string;
	name: string;
	username: string;
	image?: string | null;
};

export async function addUser({ id, email, name, username, image }: OAuthUser) {
	return client.createIfNotExists({
		_id: id,
		_type: 'user',
		email,
		name,
		username,
		image,
		following: [],
		followers: [],
		bookmarks: [],
	});
}

export async function getUserByUsername(username: string) {
	// following, followers 는 user 를 reference 하고 있어서 모든 정보를 다 가져오면 객체가 무거워진다.
	// 실제 필요한 정보들만 overriding
	return client.fetch(`
		*[_type == "user" && username == "${username}"][0]{
			...,
			"id":_id,
			following[]->{username, image},
			followers[]->{username, image},
			"bookmarks":bookmarks[]->_id
		}
	`);
}
