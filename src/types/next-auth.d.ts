import { User } from '@/model/user';
import 'next-auth';

declare module 'next-auth' {
	// d.ts 는 선언 코드만 담긴 파일을 의미
	// next-auth 에 기본적으로 정의되어 있는 파일
	// 정의되어 있는 type Session 에는 username 은 정의되어 있지 않기 때문에 추가
	// intersection type 을 통해 기존의 DefaultSession type 에 username 만 추가
	// interface Session {
	// 	user: {
	// 		username: string;
	// 	} & DefaultSession['user'];
	// }

	// /modal/user.ts 에서 type User 를 정의 했기 때문에 다시 지정
	interface Session {
		user: User;
	}
}
