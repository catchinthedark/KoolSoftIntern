import Account from '../types/account'
import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'

const PersonalInfoSchema: Schema = new Schema ({
    name: String,
    gender: String,
    dob: String,
})

const ContactInfoSchema: Schema = new Schema ({
    email: String,
    phone: String,
    address: String,
})

const AccountSchema: Schema = new Schema ({
    username: String,
    password: String,
    role: String,
    personalInfo: PersonalInfoSchema,
    contactInfo: ContactInfoSchema,
    url: String
})

export default model<Account>("account", AccountSchema)