'use client';
import { CacheKeysContext } from '@/context/CacheKeysContext';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostGrid from './PostGrid';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostIcon from './ui/icons/PostIcon';

type Props = {
	user: ProfileUser;
};
const tabs = [
	{ type: 'posts', title: 'User posts', icon: <PostIcon /> },
	{ type: 'saved', title: 'Saved posts', icon: <BookmarkIcon className='w-3 h-3' /> },
	{ type: 'liked', title: 'liked posts', icon: <HeartIcon className='w-3 h-3' /> },
];
export default function UserPosts({ user: { username } }: Props) {
	// 탭에 따라 Parameter 를 다르게 넘겨서 API 요청 수행
	// /api/users/${username}/posts
	// /api/users/${username}/liked
	// /api/users/${username}/bookmarks
	const [query, setQuery] = useState(tabs[0].type);

	return (
		<section>
			<ul className='flex justify-center uppercase'>
				{tabs.map(({ type, icon, title }) => (
					<li
						className={`mx-12 p-4 cursor-pointer border-black ${type === query && 'font-bold border-t'}`}
						key={type}
						onClick={() => setQuery(type)}
					>
						<button className='scale-150 md:scale-100' aria-label={title}>
							{icon}
						</button>
						<span className='hidden md:inline'>{type}</span>
					</li>
				))}
			</ul>
			<CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${query}` }}>
				<PostGrid />
			</CacheKeysContext.Provider>
		</section>
	);
}
