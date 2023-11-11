import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/Layout';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Staff from './pages/Staff';
import RootProvider from './providers';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LogIn />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: '/home',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: '/bookings',
		element: (
			<Layout>
				<Bookings />
			</Layout>
		),
	},
	{
		path: '/cabins',
		element: (
			<Layout>
				<Cabins />
			</Layout>
		),
	},
	{
		path: '/staff',
		element: (
			<Layout>
				<Staff />
			</Layout>
		),
	},
	// {
	// 	path: '/:page',
	// 	element: (
	// 		<Layout>
	// 			<Home />
	// 		</Layout>
	// 	),
	// },
]);
export default function App() {
	return (
		<RootProvider>
			<div className='mx-auto min-h-screen'>
				<RouterProvider router={router} />
			</div>
		</RootProvider>
	);
}
