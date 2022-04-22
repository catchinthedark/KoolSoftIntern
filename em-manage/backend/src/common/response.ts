import { Response } from "express";

export const successResponse = (res: Response, data?: any) => {
  res.json({ success: true, data });
}

export const failureResponse = (res: Response, { ...payload }: any = {}) => {
  res.json({ success: false, ...payload });
}

export const serverErrorResponse = (res: Response, status: number, { ...payload }: any = {}) => {
  res.status(status).json({ success: false, ...payload });
}