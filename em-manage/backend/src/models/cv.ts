import CV from '../types/cv'
import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'
import { PastWorkSchema, PastDegreeSchema } from './profile'

const CVSchema: Schema = new Schema ({
    username: {
        type: String,
        ref: "account"
    },
    status: String,
    round: Number,
    note: String,
    workExperience: [PastWorkSchema],
    education: [PastDegreeSchema]
})

export default model<CV>("cv", CVSchema)