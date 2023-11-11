import { mergeRouters, router } from '../trpc';
import ExampleRouter from './auth';
import CabinRouter from './cabin';

type AppRouter = typeof appRouter;

const appRouter = router({
	auth: ExampleRouter,
	cabin: CabinRouter,
});

export default appRouter;
export type { AppRouter };
