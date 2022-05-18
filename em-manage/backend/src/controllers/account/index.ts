import { Response, Request } from "express";
import Account from "../../types/account";
import accountModel from "../../models/account";
import profileModel from "../../models/profile";
import accountTokenModel from "../../models/accountToken";
import { BadRequestError, ForbiddenError, ServerError, UnauthorizedError } from "../../common/error";
import { AuthRequest } from "../../common/request";
import { successResponse, failureResponse } from "../../common/response";
import Profile from "../../types/profile";
import AccountToken from "../../types/accountToken";

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    const accounts: Account[] = await accountModel.find()
    return successResponse(res, accounts)
}

export const getAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    const body = req.body as Pick<Account, "_id">
    const account : Account | null = await accountModel.findById(body._id)
    if (!account) throw new ServerError({ data: -1 });
    return successResponse(res, account);
}

export const updateAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!
    const body = req.body as Account
    if (accountID !== body._id && role !== "HR") throw new UnauthorizedError({message: "You don't have permission to update this"})
    const updatedAccount : Account | null = await accountModel.findOneAndUpdate({ _id: body._id }, {$set: { role: body.role, personalInfo: body.personalInfo, contactInfo: body.contactInfo, url: body.url }}, { new: true })
    if (!updatedAccount) throw new BadRequestError({message: "cannot find account"})
    return successResponse(res, {account: updatedAccount})
}

export const deleteAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const { accountID, role } = req.credentials!;
    const body = req.body as Pick<Account, "_id">
    if (role != 'HR') throw new ForbiddenError({ error: "You don't have permission to do this."})
    const deletedAccount : Account | null = await accountModel.findByIdAndDelete(body._id)
    if (!deletedAccount) return failureResponse(res, {data: -2})
    const allAccounts: Account[] = await accountModel.find()

    const deletedProfile : Profile | null = await profileModel.findOneAndDelete({accountID: body._id})
    if (!deletedProfile) return failureResponse(res, {data: -2})
    const allProfiles : Profile[] = await profileModel.find()

    const deletedAccountToken : AccountToken | null = await accountTokenModel.findOneAndDelete({accountID: body._id})
    if (!deletedAccountToken) return failureResponse(res, {data: -2})
    
    return successResponse(res, { accounts: allAccounts, profiles: allProfiles })
}

