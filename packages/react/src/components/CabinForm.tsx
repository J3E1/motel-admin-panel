import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from './ui/dialog';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
} from './ui/form';
import { Label } from './ui/label';
import GlassLayout from './GlassLayout';
import { ReactNode, useState } from 'react';
import trpc from '../utils/trpc';

const formSchema = z.object({
	cabinName: z
		.string()
		.nonempty('Please add Cabin Name!')
		.min(3, 'Cabin name should contain at-least 3 characters.'),
	maxCapacity: z.string().nonempty('Please add Maximum Capacity!'),
	regularPrice: z.string().nonempty('Please add Regular Price!'),
	discount: z.string().optional().default('0'),
	description: z.string().optional().default('This is description...'),
	coverImage: z.any().default(''),
});
type Props = {
	triggerButton: ReactNode;
	editForm?: boolean;
	defaultValues?: z.infer<typeof formSchema>;
};

export default function CabinForm({
	editForm = false,
	defaultValues,
	triggerButton,
}: Props) {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...defaultValues,
			coverImage: '',
		},
	});
	const context = trpc.useContext();

	const { mutate: addCabin, isLoading } = trpc.cabin.create.useMutation({
		onSuccess(data) {
			console.log('🚀 ~ file: CabinForm.tsx:59 ~ onSuccess ~ data:', data);
			context.cabin.getAll.invalidate();
			onReset();
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		addCabin({
			cabinName: +values.cabinName,
			maxCapacity: +values.maxCapacity,
			regularPrice: +values.regularPrice,
			discount: +values.discount,
			description: values.description,
			coverImage: values.coverImage,
		});
		setOpen(false);
	}

	function onReset() {
		console.log('Reset');
		form.reset({
			cabinName: '',
			maxCapacity: '',
			regularPrice: '',
			coverImage: '',
			description: '',
			discount: '',
		});
	}
	return (
		<Dialog modal>
			<DialogTrigger asChild onClick={() => setOpen(true)}>
				{/* <Button className='rounded-lg'>Add New Cabin</Button> */}
				{triggerButton}
			</DialogTrigger>

			<GlassLayout className='ml-2'>
				<DialogContent className='max-w-3xl'>
					<DialogHeader>
						<DialogTitle className='text-xl text-center'>
							{editForm ? 'Edit Cabin' : 'Add New Cabin'}
						</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid grid-cols-1 gap-4 md:grid-cols-2'
							onReset={onReset}>
							<FormField
								control={form.control}
								name='cabinName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cabin Name: </FormLabel>
										<FormControl>
											<Input
												placeholder='000'
												type='number'
												className='rounded-lg'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='maxCapacity'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Maximum Capacity: </FormLabel>
										<FormControl>
											<Input
												placeholder='00'
												type='number'
												className='rounded-lg'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='regularPrice'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Regular Price / Per Night: </FormLabel>
										<FormControl>
											<Input
												placeholder='00'
												type='number'
												className='rounded-lg'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='discount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Discount: </FormLabel>
										<FormControl>
											<Input
												placeholder='00'
												type='number'
												className='rounded-lg'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description: </FormLabel>
										<FormControl>
											<Input
												placeholder='Add Description'
												type='text'
												className='rounded-lg'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='coverImage'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cabin Cover: </FormLabel>
										<FormControl>
											<Input
												placeholder='Select Cover Image for Cabin'
												type='file'
												accept='image/*'
												className='rounded-lg'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogClose asChild>
								<Button
									variant='destructive'
									type='reset'
									className='w-full mt-4'>
									Cancel
								</Button>
							</DialogClose>

							<Button className='w-full mt-4'>
								{editForm ? 'Edit Cabin' : 'Add Cabin'}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</GlassLayout>
		</Dialog>
	);
}
