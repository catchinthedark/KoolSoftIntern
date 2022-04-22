import { Request } from "express";
import { ObjectId } from 'mongoose'

export type Credentials = {
  accountID: ObjectId;
  username: string;
}

export interface AuthRequest extends Request {
  credentials?: Credentials
}