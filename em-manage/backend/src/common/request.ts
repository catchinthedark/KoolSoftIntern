import { Request } from "express"
import mongoose from "mongoose";

export type Credentials = {
  accountID: mongoose.Types.ObjectId;
  role: string;
}

export interface AuthRequest extends Request {
  credentials?: Credentials
}