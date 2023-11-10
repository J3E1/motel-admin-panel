import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { Button } from './ui/button';
import GlassLayout from './GlassLayout';
import { ReactNode, useState } from 'react';
import { Input } from './ui/input';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchPlaceholder?: string;
	searchItem?: string;
	addNewData?: ReactNode;
}

export default function DataTable<TData, TValue>({
	columns,
	data,
	searchItem,
	searchPlaceholder,
	addNewData,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});
	return (
		<>
			<div className='flex justify-between items-center'>
				{searchItem && searchPlaceholder && (
					<GlassLayout className='px-4 py-3 mb-3 max-w-sm'>
						<Input
							placeholder={searchPlaceholder}
							value={
								(table.getColumn(searchItem)?.getFilterValue() as string) ?? ''
							}
							onChange={event =>
								table.getColumn(searchItem)?.setFilterValue(event.target.value)
							}
							className='max-w-sm rounded-lg bg-background/70'
						/>
					</GlassLayout>
				)}

				<GlassLayout className='px-4 py-3 mb-3 max-w-sm flex'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='ml-auto bg-background/50 rounded-lg'>
								Columns
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='bg-background/50 backdrop-blur-2xl backdrop-saturate-200 shadow-sm rounded-lg'>
							{table
								.getAllColumns()
								.filter(column => column.getCanHide())
								.map(column => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={value =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					{addNewData}
				</GlassLayout>
			</div>
			<GlassLayout>
				<Table>
					<TableHeader className=''>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center font-medium'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</GlassLayout>
			<GlassLayout className='mt-2'>
				<div className='flex items-center justify-end space-x-2 py-2 px-4'>
					<div className='flex-1 text-sm text-muted-foreground'>
						{table.getPaginationRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className='space-x-2'>
						<Button
							variant='outline'
							size='sm'
							className='rounded-lg backdrop-blur-xl bg-background/20 disabled:cursor-not-allowed'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='rounded-lg backdrop-blur-xl bg-background/20 disabled:cursor-not-allowed'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							Next
						</Button>
					</div>
				</div>
			</GlassLayout>
		</>
	);
}
