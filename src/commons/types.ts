import { Request } from "express";
import { UserResponse } from "../schemas/userSchema";

export interface AuthRequest extends Request {
  user?: UserResponse;
}

export enum Roles {
  user = "user",
  admin = "admin",
  chef = "chef",
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
}
