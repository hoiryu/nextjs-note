import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	// 유저가 없을 경우 로그인 페이지로 이동
	if (!user) redirect('/auth/signin');

	return (
		<section className='flex flex-col w-full max-w-[850px] p-4 md:flex-row'>
			<div className='w-full basis-3/4 min-w-0'>
				<FollowingBar />
				<PostList />
			</div>
			<div className='basis-1/4 ml-8'>
				<SideBar user={user} />
			</div>
		</section>
	);
}
