import { getUserByUsername } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
	// 사용자가 보낸 request header 의 cookie 에 있는 Token 을 해석
	// 여기서는 session 만 체크하고 실제 DB 접근은 service 에서 처리

	const session = await getServerSession(authOptions);
	const user = session?.user;
	if (!user) return new Response('Authentication Error', { status: 401 });

	return getUserByUsername(user.username).then((data) => NextResponse.json(data));
}
