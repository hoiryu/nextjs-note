import { ProfileUser } from '@/model/user';
import FollowButton from './FollowButton';
import Avatar from './ui/Avatar';

type Props = {
	user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
	const { image, username, name, followers, following, posts } = user;
	const info = [
		{ title: 'posts', data: posts },
		{ title: 'followers', data: followers },
		{ title: 'following', data: following },
	];
	return (
		<section className='flex flex-col items-center justify-center w-full py-12 border-b border-neutral-300 md:flex-row'>
			<Avatar image={image} highlight />
			<div className='md:ml-10 basis-1/3'>
				<div className='flex flex-col items-center md:flex-row'>
					<h1 className='text-2xl md:mr-8 my-2 md:mb-0'>{username}</h1>
					<FollowButton user={user} />
				</div>
				<ul>
					{info.map(({ title, data }, index) => (
						<li key={index}>
							<span>{data}</span>
							{title}
						</li>
					))}
				</ul>
				<p>{name}</p>
			</div>
		</section>
	);
}
