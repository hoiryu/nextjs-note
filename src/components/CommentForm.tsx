import { FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
	onPostComment: (comment: string) => void;
};

/**
 * CommentForm 은 내부적으로 Api 요청을 처리하는 것이 아니라 Callback 으로 처리하여 재사용성을 높인다.
 */
export default function CommentForm({ onPostComment }: Props) {
	const [comment, setComment] = useState('');
	const buttonDisabled = comment.length === 0;
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onPostComment(comment);
		setComment('');
	};

	return (
		<form className='flex items-center px-3 border-t border-neutral-300' onSubmit={handleSubmit}>
			<SmileIcon />
			<input className='w-full ml-2 border-none outline-none p-3' type='text' placeholder='Add a comment...' required value={comment} onChange={(e) => setComment(e.target.value)} />
			<button disabled={buttonDisabled} className={`ml-2 font-bold ${buttonDisabled ? 'text-sky-200' : 'text-sky-500'}`}>
				Post
			</button>
		</form>
	);
}
