import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Front Server 에서 페이지 요청전에 Middleware 에서 페이지 및 api 요청 처리
// next-auto/middleware 는 api 는 처리하지 않고, 페이지만 처리하기 때문에 newxt-auto 에 구현되어 있는
// Middleware 를 바탕으로 재구현
export async function middleware(req: NextRequest) {
	const token = await getToken({ req });

	// Token 이 없으면 로그인 사용자가 아닌 경우
	if (!token) {
		// api 요청인 경우 로그인 사용자가 아니기 때문에 401 에러
		if (req.nextUrl.pathname.startsWith('/api')) return new NextResponse('Authentication Error', { status: 401 });

		// 특정 페이지를 전달 받을 경우
		const { pathname, search, origin, basePath } = req.nextUrl;
		// 먼저 로그인 페이지 URL 지정
		const signInUrl = new URL(`${basePath}/auth/signin/`, origin);
		// 사용자가 이동하고 싶은 페이지를 로그인전에 알고 있기 때문에 CallbackUrl 에 등록
		signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`);
		// 로그인 페이지로 Redirect
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

// Middleware 를 거쳐가는 URL 명시
export const config = {
	matcher: ['/new', '/', '/api/bookmarks', '/api/comments', '/api/likes', '/api/follow', '/api/me', '/api/posts/:path*'],
};
