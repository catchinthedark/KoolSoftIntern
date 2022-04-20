import Profile from '../types/profile'
import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'

const WorkInfoSchema: Schema = new Schema ({
    department: String,
    title: String,
    salary: Number,
    type: String,
    hireDate: String
})

export const PastWorkSchema: Schema = new Schema ({
    company: String,
    jobTitle: String,
    from: String,
    to: String,
    description: String
})

export const PastDegreeSchema: Schema = new Schema ({
    school: String,
    degree: String,
    fieldOfStudy: String,
    yearOfCompletion: Number,
    description: String
})

const ProfileSchema: Schema = new Schema ({
    username: {
        type: String,
        ref: "account"
    },
    workInfo: WorkInfoSchema,
    workExperience: [PastWorkSchema],
    education: [PastDegreeSchema]
})

export default model<Profile>("profile", ProfileSchema)