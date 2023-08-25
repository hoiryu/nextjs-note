// useThrottle.js
import { useEffect, useState } from 'react';

export default function useThrottle(value: string, delay: number = 500) {
	const [throttleValue, setThrottleValue] = useState(value);
	const [throttle, setThrottle] = useState(false);

	useEffect(() => {
		if (!throttle) {
			setThrottleValue(value);
			setTimeout(() => {
				setThrottle(false);
			}, delay);
		}

		setThrottle(true);
	}, [value, delay]);

	return throttleValue;
}
