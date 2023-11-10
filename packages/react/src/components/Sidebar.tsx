import {
	HiOutlineCalendarDays,
	HiOutlineCog6Tooth,
	HiOutlineHome,
	HiOutlineHomeModern,
	HiOutlineUsers,
	HiOutlineMagnifyingGlass,
	HiOutlineDocument,
	HiOutlineBolt,
	HiOutlineCurrencyDollar,
	HiOutlineArchiveBox,
	HiChevronLeft,
	HiChevronRight,
} from 'react-icons/hi2';
import { Link, NavLink } from 'react-router-dom';

import { Separator } from './ui/separator';
import { Fragment, useRef, RefObject, useState, useEffect } from 'react';

const links = [
	{ title: 'Home', to: '/home', icon: <HiOutlineHome /> },
	{ title: 'Bookings', to: '/bookings', icon: <HiOutlineCalendarDays /> },
	{ title: 'Cabins', to: '/cabins', icon: <HiOutlineHomeModern /> },
	{ title: 'Staff', to: '/staff', icon: <HiOutlineUsers /> },
	{ title: 'Search', to: '/search', icon: <HiOutlineMagnifyingGlass /> },
	{ title: 'Housekeeping', to: '/housekeeping', icon: <HiOutlineArchiveBox /> },
	{ title: 'Maintenance', to: '/maintenance', icon: <HiOutlineBolt /> },
	{ title: 'Report', to: '/report', icon: <HiOutlineDocument /> },
	{ title: 'Tax Report', to: '/tax-report', icon: <HiOutlineCurrencyDollar /> },
	{ title: 'Setting', to: '/setting', icon: <HiOutlineCog6Tooth /> },
];

type Props = { className?: string };
export default function Sidebar({}: Props) {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		window.screen.width <= 768 ? setOpen(false) : setOpen(true);
	}, []);

	return (
		<>
			{/* {window?.screen?.width <= 768 && open && (
				<div
					onClick={() => setOpen(false)}
					className={`h-screen w-screen z-25 backdrop-blur-2xl bg-background/30 `}></div>
			)} */}
			<aside className='col-span-2 lg:col-span-3 row-span-full flex flex-wrap items-center px-1 lg:px-2 py-2 shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start min-w-fit'>
				<ul className='w-full h-full mx-auto lg:py-3 lg:px-2 flex flex-col gap-1 items-start justify-start flex-wrap-inherit text-2xl font-semibold '>
					<Link
						to='/'
						className='w-full mx-auto rounded-xl my-4 overflow-hidden'>
						<img
							src='Noir_Lodge.svg'
							className='h-10 w-10 scale-125 object-cover mx-auto rounded-lg'
						/>
					</Link>

					<Separator />

					{links.map((link, i) => (
						<Fragment key={i}>
							<NavLink
								to={link.to}
								className='flex items-center py-3 px-4 justify-center lg:justify-start gap-2 hover:bg-background/30 active:bg-background/30 w-full hover:shadow-sm rounded-xl transition-colors duration-300 ease-in-out'>
								{link.icon}
								<span className='hidden lg:inline text-sm transition-all duration-500'>
									{link.title}
								</span>
							</NavLink>
							{(i === 3 || i === 6) && <Separator />}
						</Fragment>
					))}
				</ul>
				{/* <button
					onClick={() => setOpen(prev => !prev)}
					className={`absolute bottom-10 -right-3 z-35 p-1 shadow-sm rounded-xl bg-background/80 backdrop-blur-2xl backdrop-saturate-200 transition-all duration-500 ease-in-out ${
						open && 'rotate-[180deg]'
					}`}>
					<HiChevronRight />
				</button> */}
			</aside>
		</>
	);
}
