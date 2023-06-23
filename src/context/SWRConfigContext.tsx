'use client';

import { SWRConfig } from 'swr';

export default function SWRConfigContext({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig
			value={{
				// refreshInterval: 3000,
				fetcher: (url: string) => fetch(url).then((res) => res.json()),
			}}
		>
			{children}
		</SWRConfig>
	);
}
