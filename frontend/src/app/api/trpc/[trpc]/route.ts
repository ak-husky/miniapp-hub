import { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { allRouter } from '@/server/router';
import { createContext } from '@/server/context';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: allRouter,
    req,
    createContext,
    onError: ({ path, error }) => {
      console.error(`❌ tRPC failed on ${path}: ${error}`);
    },
  });

export { handler as GET, handler as POST };
