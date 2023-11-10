import { useState, useEffect } from 'react';

export function useLocalStorageState<T>(
	initialState: T,
	key: string
): [T, (value: React.SetStateAction<T>) => void] {
	const [value, setValue] = useState<T>(function () {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue];
}
