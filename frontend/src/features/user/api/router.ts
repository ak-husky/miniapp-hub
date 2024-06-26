// import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure } from '@/server/trpc-server';
// import { client } from '@/server/api';

export const userRouter = router({
  auth: publicProcedure
    .input(
      z.object({
        initDataRaw: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        username: z.string(),
        userid: z.string(),
        photo: z.string().url().optional(),
      }),
    )
    .output(z.object({ token: z.string() }))
    .mutation(async () => {
      // const { result, error, user } = await client.user().auth({ user_id: '', user_name: '', platform: 'tg' })
      // if (result !== 'ok') {
      //   throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error });
      // }
      return { token: '49773fe29db19502b2c5da4ec40b6b8b' };
    }),
});
