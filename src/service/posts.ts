import { SimplePost } from '@/model/post';
import { urlFor } from '@/model/user';
import { client } from './sanity';

export async function getFollowingPostsOf(username: string) {
	// post.author.username -> post.username 으로 flatten
	// 보다 쉽게 property 에 접근하기 위해 가공
	// response 의 크기가 커지면 성능에 매우 좋지 않다.
	// comments 는 목록에서 보여줄 때는 갯수만 필요하기 때문에 count 로 가공
	const simplePostProjection = `
		...,
		"username": author->username,
		"userImage": author->image,
		"image": photo,
		"likes": likes[]->username,
		"text": comments[0].comment,
		"comments": count(comments),
		"id": _id,
		"createdAt": _createdAt,
	`;

	return client
		.fetch(
			`*[_type =="post" && author->username == "${username}"
		|| author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
		| order(_createdAt desc){${simplePostProjection}
		}`
		) //
		.then((posts) => posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) })));
}

export async function getPost(id: string) {
	return client
		.fetch(
			`*[_type == "post" && _id == "${id}"][0]{
			...,
			"username": author->username,
			"userImage": author->image,
			"image": photo,
			"likes": likes[]->username,
			comments[]{comment, "username": author->username, "image": author->image},
			"id": _id,
			"createdAt": _createdAt
		}`
		)
		.then((post) => ({ ...post, image: urlFor(post.image) }));
}
