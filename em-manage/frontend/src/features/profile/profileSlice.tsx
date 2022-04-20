import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import API from "../../utils/api"

export type WorkInfo = {
    department: String,
    title: String,
    salary: number,
    type: String,
    hireDate: String
}

export type PastWork = {
    company: String,
    jobTitle: String,
    from: String,
    to: String,
    description: String
}

export type PastDegree = {
    school: String,
    degree: String,
    fieldOfStudy: String,
    yearOfCompletion: number,
    description: String
}

interface Profile {
    _id: String,
    username: String,
    workInfo: WorkInfo,
    workExperience: PastWork[],
    education: PastDegree[]
}

const profileDefault: Profile = {
    _id: '',
    username: '',
    workInfo: { department: '', title: '', salary: 0, type: '', hireDate: '' },
    workExperience: [],
    education: []
}

const initialState = {
    status: 'idle',
    profile: profileDefault,
    error: ''
}

export const SelectProfile = (state: RootState) => state

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        
    },
    extraReducers(builder: any) {
        builder
        .addCase(fetchProfile.pending, (state: RootState, action: any) => {
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchProfile.fulfilled, (state: RootState, action: any) => {
            return {
                state,
                status: "fulfilled",
                profile: action.payload
            }
        })
        .addCase(fetchProfile.rejected, (state: RootState, action: any) => {
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const fetchProfile = createAsyncThunk('fetch-profile', async (state: RootState) => {
    const username = (state: RootState) => state.me.me.username
    const response = await API.get(`${process.env.REACT_APP_BASE_URL}/profile/${username}`)
    return response
})

export default profileSlice.reducer