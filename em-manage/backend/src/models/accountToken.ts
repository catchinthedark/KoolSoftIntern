import AccountToken from '../types/accountToken'
import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'

const AccountTokenSchema: Schema = new Schema ({
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account"
    },
    accessToken: String,
    refreshToken: String
})

export default model<AccountToken>("accountToken", AccountTokenSchema)