import { Document, ObjectId } from 'mongoose'

interface AccountToken extends Document {
    accountID: ObjectId,
    accessToken: string;
    refreshToken: string;
}

export default AccountToken