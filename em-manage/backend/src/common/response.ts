import { Response } from "express";

export const successResponse = (res: Response, data?: any) => {
  res.json({ status: true, data });
}

export const failureResponse = (res: Response, { ...payload }: any = {}) => {
  res.json({ status: false, ...payload });
}

export const serverErrorResponse = (res: Response, status: number, { ...payload }: any = {}) => {
  res.status(status).json({ success: false, ...payload });
}