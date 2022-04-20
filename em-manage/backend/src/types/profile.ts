import { Document, ObjectId } from 'mongoose'

type WorkInfo = {
    department: string,
    title: string,
    salary: number,
    type: string,
    hireDate: string
}

export type PastWork = {
    company: string,
    jobTitle: string,
    from: string,
    to: string,
    description: string
}

export type PastDegree = {
    school: string,
    degree: string,
    fieldOfStudy: string,
    yearOfCompletion: number,
    description: string
}

interface Profile extends Document {
    username: string,
    workInfo: WorkInfo,
    workExperience: PastWork[],
    education: PastDegree[]
}

export default Profile