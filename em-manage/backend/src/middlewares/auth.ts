import bcrypt from 'bcrypt'
import { AES } from 'crypto-js'

export const enncryptPassword = async (plainPassword: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(plainPassword, salt)
    return hashPassword
}

export const comparePassword = async (hashPassword: string, plainPassword: string) => {
    const res = await bcrypt.compare(plainPassword, hashPassword)
    return res
}

export const decryptPassword = (encryptedPassword: string) => {
    return AES.decrypt(encryptedPassword, `${process.env.ENCRYPTED_KEY}`).toString()
}