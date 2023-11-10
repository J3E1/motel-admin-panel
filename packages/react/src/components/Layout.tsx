import { ReactNode } from 'react';
import BackgroundImage from './BackgroundImage';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<BackgroundImage />

			<div className='w-full h-screen grid grid-cols-16 grid-rows-10 gap-3 bg-black p-3'>
				<Sidebar />
				<Header />
				<div className='col-start-3 lg:col-start-4 col-end-[-1] row-start-2 row-end-[-1] min-w-fit overflow-y-scroll scroll-smooth '>
					{children}
				</div>
			</div>
		</>
	);
}
