import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

const boolean = z.enum(['true', 'false']).transform((value) => value === 'true');

const getRuntimeVariable = (key: string, defaultValue?: string) => {
  if (typeof window !== 'undefined') {
    return window.__ENV ? window.__ENV[key] ?? defaultValue : undefined;
  }
  if (typeof process === 'undefined') return undefined;
  return process.env[key] ?? defaultValue;
};

const baseEnv = {
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    DEBUG: boolean.optional().default('false'),
    API_BASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_TARGET_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: getRuntimeVariable('NODE_ENV'),
    DEBUG: getRuntimeVariable('DEBUG'),
    API_BASE_URL: getRuntimeVariable('API_BASE_URL'),
    NEXT_PUBLIC_TARGET_URL: getRuntimeVariable('NEXT_PUBLIC_TARGET_URL'),
  },
};

export const env = createEnv({
  server: {
    ...baseEnv.server,
  },
  client: {
    ...baseEnv.client,
  },
  experimental__runtimeEnv: { ...baseEnv.runtimeEnv },
  skipValidation: typeof window !== 'undefined' && window.__ENV === undefined,
  onValidationError(error) {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
    throw new Error(`Invalid environment variables: ${JSON.stringify(error.flatten().fieldErrors)}`);
  },
  onInvalidAccess: (variable: string) => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client: ${variable}`);
  },
});
