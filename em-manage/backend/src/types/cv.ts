import { Document, ObjectId } from 'mongoose'
import { PastWork, PastDegree } from './profile'

interface CV extends Document {
    username: string,
    status: string,
    round: number,
    note: string,
    workExperience: PastWork[],
    education: PastDegree[]
}

export default CV