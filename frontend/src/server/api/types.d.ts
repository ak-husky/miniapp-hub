interface BaseResult {
  result: 'ok' | 'fail';
  error: string;
}

export interface AuthRequest {
  user_id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  photo?: string;
  platform: 'tg';
}

export interface AuthResult extends BaseResult {
  user: {
    uid: number;
    authorize: string;
  };
}
