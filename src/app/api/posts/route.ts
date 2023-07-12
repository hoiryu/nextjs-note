import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getFollowingPostsOf } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
	// 사용자가 보낸 request header 의 cookie 에 있는 Token 을 해석
	// 여기서는 session 만 체크하고 실제 DB 접근은 service 에서 처리

	const session = await getServerSession(authOptions);
	const user = session?.user;
	if (!user) return new Response('Authentication Error', { status: 401 });

	return getFollowingPostsOf(user.username) //
		.then((data) => NextResponse.json(data));
}
