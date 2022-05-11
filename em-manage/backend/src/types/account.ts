import { Document } from 'mongoose'

type PersonalInfo = {
    firstName: string,
    lastName: string,
    gender: string, //not applicant
    dob: string, //not applicant
}

type ContactInfo = {
    email: string,
    phone: string,
    address: string, //not applicant
}

interface Account extends Document {
    username: string,
    password: string,
    role: string, //HR - employee - applicant
    personalInfo: PersonalInfo,
    contactInfo: ContactInfo,
    url: string
}

export default Account