import { Link, useLocation, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import ToggleDarkMode from './ToggleDarkMode';

type Props = {};
export default function Header({}: Props) {
	const location = useLocation();

	const pageName = location.pathname.slice(1) || 'home';

	const heading = pageName.charAt(0).toUpperCase() + pageName.slice(1);

	return (
		<nav className='col-start-3 lg:col-start-4 col-end-[-1] flex flex-wrap items-center px-1 py-2 shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start'>
			<div
				className='flex items-center justify-between w-full p-0 px-4
			 mx-auto flex-wrap-inherit whitespace-nowrap text-sm font-bold lg:ml-0'>
				<span className='flex-1'>{heading}</span>

				<ToggleDarkMode />

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='bg-background/10 backdrop-blur-2xl backdrop-saturate-200 shadow-2xl rounded-lg'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='rounded-lg  hover:!bg-slate-50/50'>
							<Link to={'/profile'} className='w-full'>
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='rounded-lg hover:!text-destructive-foreground hover:!bg-destructive/90'>
							Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
