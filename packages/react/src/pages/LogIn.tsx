import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../components/ui/form';
import { Label } from '../components/ui/label';
import BackgroundImage from '../components/BackgroundImage';

const formSchema = z.object({
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long.')
		.max(20, 'Password can be no longer than 20 characters.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'
		),

	email: z.string().email('Please enter a valid email address.'),
});

type Props = {};
export default function LogIn({}: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			email: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<>
			<BackgroundImage />
			<div className='h-screen flex flex-col justify-center'>
				<Card className='w-[350px] mx-auto shadow-sm rounded-xl bg-background/75 backdrop-blur-2xl backdrop-saturate-200'>
					<CardHeader>
						<CardTitle className='text-center'>Login</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4'>
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
								<Button className='w-full'>Login</Button>
								<div className='text-center text-primary underline-offset-4 hover:underline'>
									<Label>
										<Link to='/register'>Don't have an account? Register</Link>
									</Label>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
