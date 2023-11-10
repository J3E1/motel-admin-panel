import { useDarkMode } from '../hooks/useDarkMode';
import { Button } from './ui/button';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
export default function ToggleDarkMode() {
	const [isDarkMode, toggle] = useDarkMode();
	return (
		<Button
			size={'sm'}
			onClick={toggle}
			variant={'ghost'}
			className='text-lg rounded-lg mr-2'>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</Button>
	);
}
