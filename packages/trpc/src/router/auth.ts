import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { LoginStaffInput, loginStaff } from '../services/auth';

const ExampleRouter = router({
	login: publicProcedure
		.input(LoginStaffInput)
		.mutation(({ input }) => loginStaff(input)),

	// example: publicProcedure.query(async ({ ctx }) => {
	// 	return { info: 42 };
	// }),
});

export default ExampleRouter;
