import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../components/ui/form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';

const minYear = 2019,
	maxYear = 2025;

function getYearsInRange(minYear: number, maxYear: number) {
	const years = [];
	for (let year = minYear; year <= maxYear; year++) {
		years.push(year);
	}
	return years;
}

const formSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters long.')
		.max(20, 'Username can be no longer than 20 characters.')
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			'Username can only contain letters, numbers, hyphens, and underscores.'
		),

	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long.')
		.max(20, 'Password can be no longer than 20 characters.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'
		),

	email: z.string().email('Please enter a valid email address.'),

	year: z.string(),
});

const yearsInRange = getYearsInRange(minYear, maxYear);

type Props = {};
export default function Register({}: Props) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
			email: '',
			year: new Date().getFullYear().toString(),
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<div className='h-screen flex flex-col justify-center'>
			<Card className='w-[350px] mx-auto'>
				<CardHeader>
					<CardTitle>Register</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='year'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<SelectTrigger id='year'>
													<SelectValue placeholder='Select a year' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Year</SelectLabel>
														{yearsInRange.map((year, i) => (
															<SelectItem value={year.toString()} key={i}>
																{year}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder='Username' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder='Email' type='email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Password'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className='w-full'>Register</Button>
							<div className='text-center text-primary underline-offset-4 hover:underline'>
								<Label>
									<Link to='/login'>Already have an account? Login</Link>
								</Label>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
