import { router } from './trpc-server';
import { userRouter } from '@/features/user/api/router';

export const allRouter = router({
  user: userRouter,
});

export type AppRouter = typeof allRouter;
