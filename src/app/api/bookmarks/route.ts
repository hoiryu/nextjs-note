import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	return withSessionUser(async (user) => {
		const { id, bookmark } = await req.json();
		// Boolean 존재 유무를 확인할 때는 undefined 로 체크
		if (!id || bookmark == null) return new Response('Bad Request', { status: 400 });

		const request = bookmark ? addBookmark : removeBookmark;

		return request(user.id, id) //
			.then((res) => NextResponse.json(res))
			.catch((error) => new Response(JSON.stringify(error), { status: 500 }));
	});
}
