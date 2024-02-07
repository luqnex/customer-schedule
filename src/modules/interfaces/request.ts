import { Request } from 'express';

export interface IRequestExtended extends Request {
  user: {
    sub: string;
    username: string;
    iat: string;
    exp: string;
  };
}
