import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
	return fetch('/api/likes', {
		method: 'PUT',
		body: JSON.stringify({ id, like }),
	}).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
	return fetch('/api/comments', {
		method: 'POST',
		body: JSON.stringify({ id, comment }),
	}).then((res) => res.json());
}

export default function usePosts() {
	const cacheKeys = useCacheKeys();
	const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey);
	const setLike = useCallback(
		(post: SimplePost, username: string, like: boolean) => {
			const newPost = { ...post, likes: like ? [...post.likes, username] : post.likes.filter((item) => item !== username) };
			const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

			// optimisticData: 비동기 처리 전 미리 보여줄 데이터
			// populateCache: 비동기 처리 이후 전달 받은 데이터로 보여줄지 말지 선택
			// revalidate: 정보가 다 완료되면 Backend 에서 다시 정보를 요청해서 검사하는 작업을 할지 말지 선택
			// rollbackOnError: 에러 발생시 미리 보여준 데이터 롤백
			return mutate(updateLike(post.id, like), {
				optimisticData: newPosts,
				populateCache: false,
				revalidate: false,
				rollbackOnError: true,
			});
		},
		[posts, mutate]
	);

	const postComment = useCallback(
		(post: SimplePost, comment: Comment) => {
			const newPost = { ...post, comments: post.comments + 1 };
			const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

			// optimisticData: 비동기 처리 전 미리 보여줄 데이터
			// populateCache: 비동기 처리 이후 전달 받은 데이터로 보여줄지 말지 선택
			// revalidate: 정보가 다 완료되면 Backend 에서 다시 정보를 요청해서 검사하는 작업을 할지 말지 선택
			// rollbackOnError: 에러 발생시 미리 보여준 데이터 롤백
			return mutate(addComment(post.id, comment.comment), {
				optimisticData: newPosts,
				populateCache: false,
				revalidate: false,
				rollbackOnError: true,
			});
		},
		[posts, mutate]
	);

	return { posts, isLoading, error, setLike, postComment };
}
