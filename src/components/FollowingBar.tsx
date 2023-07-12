'use client';
import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './ui/Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
	// 현재 data 는 어떤 Type 인지 명시가 없음
	// Type 의 안정성을 위해 추가 필요
	const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
	// const users = data?.following;
	const users = data?.following && [...data?.following, ...data?.following, ...data?.following];

	return (
		<section className='z-0 overflow-x-auto relative flex justify-center items-center w-full min-h[90px] p-4 mb-4 rounded-lg shadow-sm shadow-neutral-300'>
			{loading ? <PacmanLoader size={8} color='red' /> : (!users || users.length === 0) && <p>{`You don't have following`}</p>}
			{users && users.length > 0 && (
				<ScrollableBar>
					{users.map(({ image, username }) => (
						<Link key={username} className='flex flex-col items-center w-20' href={`/user/${username}`}>
							<Avatar image={image} highlight />
							<p className='overflow-hidden w-full text-sm text-center text-ellipsis'>{username}</p>
						</Link>
					))}
				</ScrollableBar>
			)}
		</section>
	);
}
