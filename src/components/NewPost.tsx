'use client';
import { AuthUser } from '@/model/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
import PostUserAvatar from './PostUserAvatar';
import Button from './ui/Button';
import GridSpinner from './ui/GridSpinner';
import FilesIcon from './ui/icons/FilesIcon';

type Props = {
	user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
	const [dragging, setDragging] = useState(false);
	const [file, setFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const files = e.target?.files;
		if (files && files[0]) {
			setFile(files[0]);
		}
	};
	const handleDrag = (e: DragEvent) => {
		switch (e.type) {
			case 'dragenter':
				setDragging(true);
				break;
			case 'dragleave':
				setDragging(false);
				break;
			default:
		}
	};
	const handleDragOver = (e: DragEvent) => e.preventDefault();
	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		setDragging(false);
		const files = e.dataTransfer?.files;
		if (files && files[0]) {
			setFile(files[0]);
			console.log(file);
		}
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!file) return;
		setLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('text', textRef.current?.value ?? '');
		fetch('/api/posts/', { method: 'POST', body: formData })
			.then((res) => {
				if (!res.ok) {
					setError(`${res.status} ${res.statusText}`);
					return;
				}
				router.push('/');
			})
			.catch((error) => setError(error.toString()))
			.finally(() => setLoading(false));
	};

	return (
		<section className='flex flex-col items-center w-full max-w-xl mt-6'>
			{loading && (
				<div className='z-20 absolute inset-0 pt-[30%] text-center bg-sky-500/20'>
					<GridSpinner />
				</div>
			)}
			{error && <p className='w-full text-center text-red-600 bg-red-100 p-4 mb-4 font-bold'>{error}</p>}
			<PostUserAvatar username={username} image={image || ''} />
			<form className='w-full flex flex-col mt-2' onSubmit={handleSubmit}>
				<input className='hidden' type='file' name='input' id='input-upload' accept='image/*' onChange={handleChange} />
				<label
					className={`flex flex-col items-center justify-center w-full h-60 ${!file && 'border-2 border-sky-500 border-dashed'}`}
					htmlFor='input-upload'
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					{dragging && <div className='z-10 absolute inset-0 bg-sky-500/20 pointer-events-none' />}
					{!file && (
						<div className='flex flex-col items-center pointer-events-none'>
							<FilesIcon />
							<p>Drag and Drop your image here or click</p>
						</div>
					)}
					{file && (
						<div className='relative w-full aspect-square'>
							<Image className='object-cover' src={URL.createObjectURL(file)} alt='local file' fill sizes='650px' />
						</div>
					)}
				</label>
				<textarea
					className='outline-none text-lg border border-neutral-300'
					name='text'
					id='input-text'
					rows={10}
					placeholder='write a caption'
					ref={textRef}
					required
				></textarea>
				<Button text='publish' onClick={() => {}} />
			</form>
		</section>
	);
}
