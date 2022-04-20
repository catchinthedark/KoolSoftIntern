import { Response, Request } from "express";
import Account from "../../types/account";
import accountModel from "../../models/account";
import mongoose from "mongoose";
import { enncryptPassword, decryptPassword } from "../../middlewares/auth";
import { BadRequestError } from "../../common/error";

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    const accounts: Account[] = await accountModel.find()
    res.status(200)
       .json(accounts)
}

export const addAccount = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<Account, "username" | "password" | "role" | "personalInfo" | "contactInfo" | "url">
    const foundAccount : Account | null = await accountModel.findOne({username: body.username})
    if (foundAccount) throw new BadRequestError({message: 'Username existed!'})
    const password = await enncryptPassword(decryptPassword(body.password))
    const account : Account = new accountModel({
        username: body.username,
        password: password,
        role: body.role,
        personalInfo: body.personalInfo,
        contactInfo: body.contactInfo,
        url: body.url
    })    
    const newAccount : Account = await account.save()
    console.log('sign up success')
    res.json({ status: true, data: newAccount})
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

