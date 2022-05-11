import { Response, Request } from "express";
import Account from "../../types/account";
import accountModel from "../../models/account";
import mongoose from "mongoose";
import { BadRequestError, ForbiddenError, ServerError } from "../../common/error";
import { AuthRequest } from "../../common/request";
import { successResponse, failureResponse } from "../../common/response";

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    const accounts: Account[] = await accountModel.find()
    return successResponse(res, accounts)
}

export const getAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    let thisAccountID = accountID
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (role === 'HR' && thisAccountID !== _id) thisAccountID = _id
    const account : Account | null = await accountModel.findById(thisAccountID)
    if (!account) throw new ServerError({ data: -1 });
    return successResponse(res, account);
}

export const updateAccount = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Account
    const updatedAccount : Account | null = await accountModel.findOneAndUpdate({ _id: body._id }, {$set: { role: body.role, personalInfo: body.personalInfo, contactInfo: body.contactInfo, url: body.url }} )
    if (!updatedAccount) throw new BadRequestError({message: 'Account not found!'})
    const account: Account | null = await accountModel.findById({ _id: body._id })
    const allAccounts: Account[] = await accountModel.find()

    return successResponse(res, { account: account, accounts: allAccounts })
}

export const deleteAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    if (role != 'HR') throw new ForbiddenError({ error: "You don't have permission to do this."})
    const _Id = new mongoose.Types.ObjectId(req.params.id)
    const deletedAccount : Account | null = await accountModel.findByIdAndDelete(_Id)
    const allAccounts: Account[] = await accountModel.find()
    if (!deletedAccount) return failureResponse(res, {data: -2})
    return successResponse(res, { account: deletedAccount, accounts: allAccounts })
}

