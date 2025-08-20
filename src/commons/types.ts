import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role?: string;
    [key: string]: unknown;
  };
}

export enum Roles {
  user = 'user',
  admin = 'admin',
  chef = 'chef'
}
