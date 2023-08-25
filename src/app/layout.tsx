import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Navbar from '../components/Navbar';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'SeungStargram',
		template: 'SeungStargram | %s',
	},
	description: 'SeungStargram Photos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={openSans.className}>
			<body className='overflow-auto w-full bg-neutral-50' suppressHydrationWarning>
				<AuthContext>
					<header className='z-10 sticky top-0 border-b bg-white'>
						<div className='max-w-screen-xl mx-auto'>
							<Navbar />
						</div>
					</header>
					<main className='flex justify-center w-full max-w-screen-xl mx-auto'>
						<SWRConfigContext>{children}</SWRConfigContext>
					</main>
				</AuthContext>
				{/* 최상위 팝업 */}
				<div id='portal'></div>
			</body>
		</html>
	);
}
