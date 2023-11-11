import { ZodError, z } from 'zod';
import { TRPCError } from '@trpc/server';

export const RegisterStaffInput = z.object({
	name: z.string({ required_error: 'Please a enter a name.' }).min(1),
	email: z
		.string({ required_error: 'Please enter a password' })
		.email({ message: 'Please enter a valid email.' })
		.min(1),
	password: z
		.string({ required_error: 'Please enter a password' })
		.min(4, { message: 'Password must be at least 4 characters long.' }),
	role: z.enum(['MANAGER', 'ADMIN']).default('MANAGER'),
	dob: z.date({
		invalid_type_error: 'Please enter a valid date.',
		required_error: 'Please enter a date.',
	}),
});

export const LoginStaffInput = z.object({
	email: z
		.string({ required_error: 'Please enter a password' })
		.email({ message: 'Please enter a valid email.' })
		.min(1),
	password: z
		.string({ required_error: 'Please enter a password' })
		.min(4, { message: 'Password must be at least 4 characters long.' }),
});

export async function registerStaff(data: typeof RegisterStaffInput._input) {
	try {
		// Check if the user with the provided email already exists
		// const existingUser = await db
		// 	.selectDistinct()
		// 	.from(users)
		// 	.where(eq(users.email, data.email));
		// if (existingUser.length) {
		// 	throw new Error('Email is already registered');
		// }
		// Hash the user's password before storing it
		// const hashedPassword = await bcrypt.hash(data.password, 10);
		// Create the user in the database
		// const newUser = await db.insert(users).values({
		// 	...data,
		// });
		// Generate a JWT token for the authenticated user
		// const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
		// 	expiresIn: TOKEN_EXPIRATION,
		// });
		return {
			message: 'registered',
		};
	} catch (error) {
		if (error instanceof ZodError)
			throw new Error(`Registration failed: ${error.message}`);
		else throw new Error(`Registration failed: ${error}`);
	}
}

export async function loginStaff(data: typeof LoginStaffInput._input) {
	try {
		// const user = await prisma.user.findUnique({
		// 	where: {
		// 		email: data.email,
		// 	},
		// });

		// if (!user) {
		// 	throw new Error('User not found!');
		// }

		// const isPasswordValid = await bcrypt.compare(data.password, user.password);

		// if (!isPasswordValid) {
		// 	throw new Error('Invalid Password!');
		// }
		// // Generate a JWT token for the authenticated user
		// const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
		// 	expiresIn: TOKEN_EXPIRATION,
		// });

		if (data.email !== 'ligma@gmail.com' || data.password !== '1234')
			throw new Error(`Invalid Credentials`);

		return {
			message: 'Login',
		};
	} catch (error) {
		if (error instanceof ZodError)
			throw new Error(`Validation failed: ${error.message}`);
		if (error instanceof TRPCError) new TRPCError(error);
		else throw new Error(`${error}`);
	}
}
