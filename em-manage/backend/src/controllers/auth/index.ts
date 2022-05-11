import { Response, Request } from "express"
import { AuthRequest } from '../../common/request'
import Account from "../../types/account"
import accountModel from "../../models/account"
import accountTokenModel from "../../models/accountToken"
import { ServerError } from "../../common/error"
import { comparePassword, decryptPassword, encryptPassword } from "../../middlewares/auth"
import { successResponse } from "../../common/response"
import { signCredentials } from "../../middlewares/jwtHelper"
import AccountToken from "../../types/accountToken"
import Profile from "../../types/profile"
import { addProfile } from "../profile"
import mongoose from "mongoose"

export const login = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<Account, "username" | "password">
    const account = await accountModel.findOne({ username: body.username })
    if (!account) throw new ServerError({ data: -1 })
    const result = await comparePassword(account.password, decryptPassword(body.password))
    if (!result) throw new ServerError({ data: -1 })

    const accessToken = signCredentials({ credentials: { accountID: account._id, role: account.role } })
    const refreshToken = signCredentials({ credentials: { accountID: account._id, role: account.role }, type: 'refreshToken' })
    await accountTokenModel.findOneAndUpdate({ accountID: account._id }, { $set: { accessToken, refreshToken } }).exec()

    const response = {
        accountID: account._id, 
        role: account.role
    }
    const cookieOptions = { httpOnly: true }
    res.cookie('x-access-token', accessToken, { ...cookieOptions/*, maxAge: 1000 * 60 * 60 * 24 * 365*/ })
    res.cookie('x-refresh-token', refreshToken, { ...cookieOptions/*, maxAge: 1000 * 60 * 60 * 24 * 365*/ })
    res.cookie('isLogin', true)

    console.log('login success')
    return successResponse(res, response)
}

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    const credentials = req.credentials
    if (credentials) {
      const accountID = credentials.accountID
      await accountTokenModel.findOneAndUpdate({ accountID }, { $set: { accessToken: null, refreshToken: null } }, { new: true })
    }
    res.clearCookie('x-access-token')
    res.clearCookie('x-refresh-token')
    res.cookie('isLogin', false)

    console.log('logout success')
    return successResponse(res)
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Pick<Account, "password" | "role" | "personalInfo" | "contactInfo" | "url">
    console.log(body)
    const foundAccount : Account | null = await accountModel.findOne({ "personalInfo.firstName": body.personalInfo.firstName, "personalInfo.lastName": body.personalInfo.lastName, "contactInfo.email": body.contactInfo.email })
    if (foundAccount) throw new ServerError({ data: -2 })

    let lastname: string = ''
    const text: string[] = body.personalInfo.lastName.split(' ')
    for (const txt of text) {
        lastname = lastname + txt.substring(0,1)
    }
    const username = (body.personalInfo.firstName + lastname + body.contactInfo.phone.substring(7,9)).toLowerCase()
    const password = await encryptPassword(decryptPassword(body.password))
    
    const account : Account = new accountModel({
        username: username,
        password: password,
        role: body.role,
        personalInfo: body.personalInfo,
        contactInfo: body.contactInfo,
        url: body.url
    })    
    const newAccount : Account = await account.save()
    const profile : Profile = await addProfile(newAccount)
    const accountToken : AccountToken = new accountTokenModel({
        accountID: account._id
    })
    const newAccountToken : AccountToken = await accountToken.save()
    
    const response = {
        accountID: account._id, 
        role: account.role,
        username: account.username
    }
    return successResponse(res, response)
}

export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
    const credentials = req.credentials
    const accessToken = await getRefreshToken({ accountID: credentials?.accountID! })

    const cookieOptions = { httpOnly: true }
    res.cookie('x-access-token', accessToken, { ...cookieOptions/*, maxAge: 1000 * 60 * 60 * 24 * 365*/ })

    return successResponse(res)
}

export const getAccessToken = async (args: { accountID: mongoose.Types.ObjectId }) => {
    const accountToken = await accountTokenModel.findOne({ accountID: args.accountID });
    return accountToken?.get("accessToken") ?? '';
}

export const getRefreshToken = async (args: { accountID: mongoose.Types.ObjectId }) => {
    const accountToken = await accountTokenModel.findOne({ accountID: args.accountID });
    return accountToken?.get("refreshToken") ?? '';
 }