'use client';
import useMe from '@/hooks/me';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import Avatar from './ui/Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
	const { user, isLoading: loading, error } = useMe();
	const users = user?.following;

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
