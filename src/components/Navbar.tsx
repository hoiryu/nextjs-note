'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from './ui/Avatar';
import ColorButton from './ui/ColorButton';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import HomeIcon from './ui/icons/HomeIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import NewIcon from './ui/icons/NewIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import SearchIcon from './ui/icons/SearchIcon';

const menu = [
	{
		href: '/',
		icon: <HomeIcon />,
		clickedIcon: <HomeFillIcon />,
		title: 'Home',
	},
	{
		href: '/search',
		icon: <SearchIcon />,
		clickedIcon: <SearchFillIcon />,
		title: 'Search users',
	},
	{
		href: '/new',
		icon: <NewIcon />,
		clickedIcon: <NewFillIcon />,
		title: 'New post',
	},
];
export default function Navbar() {
	// 현재 URL path 를 가져올 수 있음
	const pathName = usePathname();
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<div className='flex justify-between items-center px-6'>
			<Link href='/'>
				<h1 className='text-3xl font-bold' aria-label='Home'>
					Instagram
				</h1>
			</Link>
			<nav>
				<ul className='flex items-center gap-4 p-4'>
					{menu.map(({ href, icon, clickedIcon, title }) => (
						// 현재 URL parameter 를 체크하여 clickedIcon 표기
						<li key={href}>
							<Link href={href} aria-label={title}>
								{pathName === href ? clickedIcon : icon}
							</Link>
						</li>
					))}
					{user && (
						<li>
							<Link href={`/user/${user.username}`} aria-label='User detail'>
								<Avatar image={user.image} size='small' highlight />
							</Link>
						</li>
					)}
					{session ? <ColorButton text='Sign out' onClick={() => signOut()} /> : <ColorButton text='Sign in' onClick={() => signIn()} />}
				</ul>
			</nav>
		</div>
	);
}
