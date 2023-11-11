import { z } from 'zod';
import {
	CabinInput,
	addCabin,
	deleteCabin,
	duplicateCabin,
	editCabin,
	getAllCabins,
} from '../services/cabins';
import { publicProcedure, router } from '../trpc';

const CabinRouter = router({
	create: publicProcedure
		.input(CabinInput)
		.mutation(({ input }) => addCabin(input)),
	edit: publicProcedure
		.input(z.object({ cabinId: z.number(), data: CabinInput }))
		.mutation(({ input }) => editCabin(input.cabinId, input.data)),
	delete: publicProcedure
		.input(z.number())
		.mutation(({ input }) => deleteCabin(input)),
	duplicate: publicProcedure
		.input(z.number())
		.mutation(({ input }) => duplicateCabin(input)),
	getAll: publicProcedure.query(getAllCabins),
	getSingle: publicProcedure
		.input(z.number())
		.query(({ input: cabinId }) => duplicateCabin(cabinId)),
});

export default CabinRouter;
