'use client';

import usePosts from '@/hooks/posts';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';

export default function PostList() {
	// 자체적으로 사용하는 것이 아니라 usePosts 사용
	// const { data: posts, isLoading: loading } = useSWR<SimplePost[]>('/api/posts');
	const { posts, isLoading: loading } = usePosts();

	return (
		<section>
			{loading && (
				<div className='text-center mt-32'>
					<GridSpinner color='red' />
				</div>
			)}
			{posts && (
				<ul className='flex flex-col gap-5'>
					{posts.map((post, index) => (
						<li key={post.id}>
							<PostListCard post={post} priority={index < 2} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
