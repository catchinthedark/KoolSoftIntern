import { Response, Request } from "express";
import Account from "../../types/account"
import accountModel from "../../models/account";
import { ServerError } from "../../common/error";
import { comparePassword, decryptPassword } from "../../middlewares/auth";
import { successResponse } from "../../common/response";

export const login = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<Account, "username" | "password">
    const account = await accountModel.findOne({ username: body.username })
    if (!account) throw new ServerError({ data: -1 })
    const result = await comparePassword(account.password, decryptPassword(body.password))
    if (!result) throw new ServerError({ data: -1 })
    console.log('login success')
    res.cookie('isLogin', true)
    res.cookie('username', account.username)
    res.send({ data: body.username, status: true })
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.cookie('isLogin', false)
    res.cookie('username', '')
    console.log('logout success')
    res.send({ message:'logout success', status: true })
}

export const getMe = async (req: Request, res: Response): Promise<void> => {
    const account = await accountModel.findOne({ username: req.params.username })
    if (!account) throw new ServerError({ data: -1 })
    res.send({ data: account, status: true })
}
