import { type Session } from 'next-auth';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

type CreateContextOptions = {
  session: Session | null;
};

/**
 * Use this helper for:
 *
 * - Testing, so we dont have to mock Next.js' req/res
 * - Trpc's `createSSGHelpers` where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
  };
};

/**
 * This is the actual context you'll use in your router
 *
 * @link https://trpc.io/docs/context
 */
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    ...createContextInner({ session: null }),
    ...opts,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
