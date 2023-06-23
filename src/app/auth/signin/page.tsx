import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Signin from '@/components/Signin';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
	searchParams: {
		callbackUrl: string;
	};
};

export default async function SignPage({ searchParams: { callbackUrl } }: Props) {
	// Next.js 는 url parameter 를 props 로 전달해준다
	const session = await getServerSession(authOptions);
	if (session) redirect('/');

	// getProviders 는 null 을 반환할 수 있기 때문에 기본값 적용
	const providers = (await getProviders()) ?? {};
	return (
		<section className='flex justify-center mt-24'>
			{/* callbackUrl 이 없을 경우 홈으로 이동 */}
			<Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
		</section>
	);
}
