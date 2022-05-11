import { Document, ObjectId } from 'mongoose'

export type WorkInfo = {
    department: string,
    title: string,
    salary: number,
    type: string,
    hireDate: string
}

export type PastWork = {
    no: number,
    company: string,
    jobTitle: string,
    from: string,
    to: string,
    description: string
}

export type PastDegree = {
    no: number,
    school: string,
    degree: string,
    fieldOfStudy: string,
    yearOfCompletion: string,
    description: string
}

export type CVNote = {
    status: string, //"under review" - "interview offered" - "job offered" - "closed"
    note: string,
}

interface Profile extends Document {
    accountID: ObjectId,
    type: string, //CV-profile
    cvNote: CVNote, //only for applicant
    workInfo: WorkInfo,
    workExperience: PastWork[],
    personalProjects: PastWork[],
    achievements: PastDegree[],
    education: PastDegree[],
}

export default Profile