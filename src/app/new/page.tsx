import NewPost from '@/components/NewPost';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
	title: 'New Post',
	description: 'Create a New Post',
};
export default async function NewPostPage() {
	const session = await getServerSession(authOptions);
	console.log(session);
	if (!session?.user) redirect('/auth/signin');
	return <NewPost user={session.user} />;
}
