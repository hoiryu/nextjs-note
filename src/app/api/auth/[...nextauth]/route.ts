import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { addUser } from '../../../../service/user';
export const authOptions: NextAuthOptions = {
	secret: process.env.GOOGLE_OAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_OAUTH_ID || '',
			clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
		}),
	],
	callbacks: {
		async signIn({ user: { id, name, image, email } }) {
			if (!email) return false;

			addUser({ id, name: name || '', image, email: email || '', username: email.split('@')[0] });
			return true;
		},
		async session({ session }) {
			// console.log(session);
			// 유저 체크
			const user = session?.user;
			if (user) {
				// 유저가 있을 경우 session 에 재할당
				// session 의 user 에는 기존에 username 의 type 이 정의되어 있지 않기 때문에 custom type 을 만들어줘야 한다.
				session.user = {
					...user,
					username: user.email?.split('@')[0] || '',
				};
			}
			return session;
		},
	},
	pages: {
		// 커스텀 페이지
		signIn: '/auth/signin',
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
