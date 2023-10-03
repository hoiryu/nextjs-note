import { createContext, useContext } from 'react';

type CacheKeysValue = {
	postsKey: string;
};

export const CacheKeysContext = createContext<CacheKeysValue>({
	postsKey: '/api/posts',
});

// 외부에서 사용하기 쉽게 Hook 형태로 export
export const useCacheKeys = () => useContext(CacheKeysContext);
