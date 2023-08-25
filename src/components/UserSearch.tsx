'use client';

import useDebounce from '@/hooks/debounce';
import { SearchUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import UserCard from './UserCard';
import GridSpinner from './ui/GridSpinner';

export default function UserSearch() {
	const [keyword, setKeyword] = useState('');
	const debouncedKeyword = useDebounce(keyword, 2000);
	const { data: users, isLoading, error } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<section className='flex flex-col items-center max-w-2xl w-full my-4'>
			<form className='w-full mb-4' onSubmit={onSubmit}>
				<input className='w-full text-xl p-3 outline-none border border-gray-400' type='text' placeholder='Search for a username or name' value={keyword} onChange={(e) => setKeyword(e.target.value)} autoFocus />
			</form>
			{error && <p>에러가 발생했습니다.</p>}
			{isLoading && <GridSpinner />}
			{!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없습니다.</p>}
			<ul className='w-full p-4'>
				{users &&
					users.map((user) => (
						<li key={user.username}>
							<UserCard user={user} />
						</li>
					))}
			</ul>
		</section>
	);
}
