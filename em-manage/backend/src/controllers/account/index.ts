import { Response, Request } from "express";
import Account from "../../types/account";
import accountModel from "../../models/account";
import mongoose from "mongoose";
import { BadRequestError, ServerError } from "../../common/error";
import { AuthRequest } from "../../common/request";
import { successResponse } from "../../common/response";

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    const accounts: Account[] = await accountModel.find()
    return successResponse(res, accounts)
}

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, username } = req.credentials!;
    const account = await accountModel.findOne({ username: username })
    if (!account) throw new ServerError({ data: -1 });
    return successResponse(res, account);
}

export const updateAccount = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }, body } = req
    const _Id = new mongoose.Types.ObjectId(id)
    const updatedAccount : Account | null = await accountModel.findByIdAndUpdate(
        { _id: _Id },
        body
    )
    if (!updatedAccount) throw new BadRequestError({message: 'Account not found!'})
    const allAccounts: Account[] = await accountModel.find()

    res.status(200)
       .json({ message: "Account updated", account: updatedAccount, accounts: allAccounts })
}

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    const _Id = new mongoose.Types.ObjectId(req.params.id)
    const deletedAccount : Account | null = await accountModel.findByIdAndDelete(_Id)
    const allAccounts: Account[] = await accountModel.find()

    res.status(200)
       .json({ message: "Account deleted", account: deletedAccount, accounts: allAccounts })
}

