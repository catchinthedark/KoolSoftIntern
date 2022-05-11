import Profile from '../types/profile'
import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'

const WorkInfoSchema: Schema = new Schema ({
    department: String,
    title: String,
    salary: Number, //only profile
    type: String, //only profile
    hireDate: String //only profile
})

export const PastWorkSchema: Schema = new Schema ({
    no: Number,
    company: String,
    jobTitle: String,
    from: String,
    to: String,
    description: String
})

export const PastDegreeSchema: Schema = new Schema ({
    no: Number,
    school: String,
    degree: String,
    fieldOfStudy: String,
    yearOfCompletion: String,
    description: String
})

export const CVNoteSchema: Schema = new Schema ({
    status: String, //passed - eliminated - considering
    note: String,
})

const ProfileSchema: Schema = new Schema ({
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account"
    },
    type: String, //CV-profile
    cvNote: CVNoteSchema, //only CV
    workInfo: WorkInfoSchema,
    workExperience: [PastWorkSchema],
    personalProjects: [PastWorkSchema],
    achievements: [PastDegreeSchema],
    education: [PastDegreeSchema],
})

export default model<Profile>("profile", ProfileSchema)