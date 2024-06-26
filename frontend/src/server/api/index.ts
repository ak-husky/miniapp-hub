import axios from 'axios';
import { env } from '@/env';
import { AuthRequest, AuthResult } from './types';

interface ClientOptions {
  baseUrl?: string;
}

interface Context {
  token?: string | null;
  headers?: Record<string, any>;
}

export class GameClient {
  private opts: ClientOptions;

  constructor(opts: ClientOptions = {}) {
    const defaults = {
      baseUrl: '',
    };
    this.opts = { ...defaults, ...opts };
  }

  async sendRequest<T = any>(ctx: Context, method: string, endpoint: string, data: any = undefined) {
    const headers = {
      'Content-Type': 'application/json',
      ...(ctx.token && { Authorization: ctx.token }),
      ...ctx.headers,
    };
    const url = `${this.opts.baseUrl}${endpoint}`;
    const response = await axios({
      method,
      url,
      data,
      headers,
      responseType: 'json',
    });
    return response.data as T;
  }

  user(ctx: Context = {}) {
    return {
      auth: async (req: AuthRequest) => this.sendRequest<AuthResult>(ctx, 'POST', `/user/auth`, req),
    };
  }
}

export const client = new GameClient({
  baseUrl: env.API_BASE_URL,
});
