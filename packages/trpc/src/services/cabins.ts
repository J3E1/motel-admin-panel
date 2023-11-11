import { z } from 'zod';
import db from '../config/db';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

export const CabinInput = z.object({
	cabinName: z.number().min(1, 'Please add Cabin Name!'),
	maxCapacity: z.number().min(1, 'Please add Maximum Capacity!'),
	regularPrice: z.number().min(1, 'Please add Regular Price!'),
	discount: z.number().optional().default(0),
	description: z.string().optional().default('This is description...'),
	coverImage: z.any().default(''),
});

export async function getAllCabins() {
	const cabins = await db.cabin.findMany();

	return {
		cabins,
		length: cabins.length,
	};
}
export async function getCabin(cabinId: number) {
	const cabin = await db.cabin.findUnique({
		where: {
			cabinName: cabinId,
		},
	});

	if (!cabin)
		throw new TRPCError({
			message: 'No cabin found',
			code: 'NOT_FOUND',
		});

	return {
		cabin,
	};
}
export async function addCabin(data: typeof CabinInput._input) {
	const cabin = await db.cabin.create({
		data,
	});

	return {
		cabin,
	};
}
export async function editCabin(
	cabinId: number,
	data: Partial<typeof CabinInput._input>
) {
	const cabin = await db.cabin.update({
		data,
		where: {
			cabinName: cabinId,
		},
	});

	return {
		cabin,
	};
}
export async function deleteCabin(cabinId: number) {
	const cabin = await db.cabin.delete({
		where: {
			cabinName: cabinId,
		},
	});

	return {
		cabin,
	};
}
export async function duplicateCabin(cabinId: number) {
	const origCab = await db.cabin.findUnique({
		where: {
			cabinName: cabinId,
		},
	});
	if (!origCab)
		throw new TRPCError({
			message: 'No cabin found',
			code: 'NOT_FOUND',
		});

	const lastCabinId = await db.cabin.findFirst({
		orderBy: {
			cabinName: 'desc',
		},
	});

	const dupCab = await db.cabin.create({
		data: {
			...origCab,
			cabinName: (lastCabinId?.cabinName ?? 200) + 1,
		},
	});

	return {
		dupCab,
	};
}
