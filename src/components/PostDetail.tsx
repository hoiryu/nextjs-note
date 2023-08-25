import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import userSWR from 'swr';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import PostUserAvatar from './PostUserAvatar';
import Avatar from './ui/Avatar';

type Props = {
	post: SimplePost;
};

export default function PostDetail({ post }: Props) {
	// SimplePost 는 comment 정보를 갖고 있지 않다. 그렇기에 별도로 받아오는 API 통신 필요
	const { id, userImage, username, image, createdAt, likes } = post;
	const { data } = userSWR<FullPost>(`/api/posts/${id}`);
	const comments = data?.comments;
	const handlePostComment = (comment: string) => {};

	return (
		<section className='flex w-full h-full'>
			<div className='relative basis-3/5'>
				<Image className='object-cover' src={image} alt={`photo by ${username}`} priority fill sizes='650px' />
			</div>
			<div className='flex flex-col basis-2/5 w-full'>
				<PostUserAvatar image={userImage} username={username} />
				<ul className='overflow-y-auto h-full p-4 mb-1 border-t border-gray-200'>
					{comments &&
						comments.map(({ image, username: commentUsername, comment }, index) => (
							<li key={index} className='flex items-center mb-1'>
								<Avatar image={image} size='small' highlight={commentUsername === username} />
								<div className='ml-2'>
									<span className='font-bold mr-1'>{commentUsername}</span>
									<span>{comment}</span>
								</div>
							</li>
						))}
				</ul>
				<ActionBar post={post} />
				<CommentForm onPostComment={handlePostComment} />
			</div>
		</section>
	);
}
