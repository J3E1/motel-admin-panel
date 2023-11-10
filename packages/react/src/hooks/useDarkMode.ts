import { useEffect } from 'react';
import { useLocalStorageState } from './useLocalStorage';

export function useDarkMode(): [boolean, () => void] {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window.matchMedia('(prefers-color-scheme: dark)').matches,
		'isDarkMode'
	);

	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.remove('light');
			} else {
				document.documentElement.classList.add('light');
				document.documentElement.classList.remove('dark');
			}
		},
		[isDarkMode]
	);

	function toggleDarkMode() {
		setIsDarkMode(prev => !prev);
	}

	return [isDarkMode, toggleDarkMode];
}
