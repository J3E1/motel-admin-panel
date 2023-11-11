import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import cabins from '../data/cabins.json';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from './ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import CabinForm from './CabinForm';
import { Dialog, DialogTrigger } from './ui/dialog';
import WarningDialog from './WarningDialog';
export type Cabin = {
	id: number;
	cabinName: number;
	maxCapacity: number;
	regularPrice: number;
	discount: number | null;
	description: string | null;
	coverImage: string | null;
};

export const CabinColumns: ColumnDef<Cabin>[] = [
	{
		accessorKey: 'cabinName',
		header: ({ column }) => (
			<Button
				className='text-left'
				variant='ghost'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Cabin Name
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => {
			return (
				<div className='text-left font-medium flex items-center'>
					<img
						src='motel-b&w.jpg'
						alt=''
						className='h-8 aspect-video object-cover'
					/>
					<span className='ml-4'>{row.getValue('cabinName')}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'maxCapacity',
		header: ({ column }) => (
			<Button
				className='text-left'
				variant='ghost'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Capacity
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => {
			return (
				<div className='text-left px-4 font-medium'>
					{row.getValue('maxCapacity')}
				</div>
			);
		},
	},
	{
		accessorKey: 'regularPrice',
		header: ({ column }) => (
			<Button
				className='text-left'
				variant='ghost'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Price
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('regularPrice'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return <div className='text-left px-4 font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'discount',
		header: ({ column }) => (
			<Button
				className='text-left'
				variant='ghost'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Discount
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('discount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return (
				<div className='text-left px-4 font-medium text-green-600 dark:text-green-400'>
					{amount ? formatted : '--'}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const cabin = row.original;

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0 rounded-lg'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='bg-background/10 backdrop-blur-2xl backdrop-saturate-200 shadow-2xl rounded-lg'>
							<DropdownMenuItem>
								<HiSquare2Stack />
								<span className='ml-2'>Duplicate</span>
							</DropdownMenuItem>

							<CabinForm
								//@ts-ignore
								defaultValues={cabin}
								editForm
								triggerButton={
									<DropdownMenuItem>
										<HiPencil />
										<span className='ml-2'>Edit</span>
									</DropdownMenuItem>
								}
							/>

							<WarningDialog
								trigger={
									<DropdownMenuItem>
										<HiTrash />
										<span className='ml-2'>Delete</span>
									</DropdownMenuItem>
								}
							/>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			);
		},
	},
];
