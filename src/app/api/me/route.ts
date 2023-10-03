import { getUserByUsername } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextResponse } from 'next/server';

export async function GET() {
	return withSessionUser(async (user) => {
		// 사용자가 보낸 request header 의 cookie 에 있는 Token 을 해석
		// 여기서는 session 만 체크하고 실제 DB 접근은 service 에서 처리
		return getUserByUsername(user.username) //
			.then((data) => NextResponse.json(data));
	});
}
