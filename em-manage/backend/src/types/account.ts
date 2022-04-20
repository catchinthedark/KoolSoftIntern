import { Document, ObjectId } from 'mongoose'

type PersonalInfo = {
    name: string,
    gender: string,
    dob: string,
}

type ContactInfo = {
    email: string,
    phone: string,
    address: string,
}

interface Account extends Document {
    username: string,
    password: string,
    role: string,
    personalInfo: PersonalInfo,
    contactInfo: ContactInfo,
    url: string
}

export default Account