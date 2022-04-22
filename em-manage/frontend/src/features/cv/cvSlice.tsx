import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import fetchInterceptors from "../../utils/fetchInterceptors"
import { PastWork, PastDegree } from '../profile/profileSlice'

interface CV {
    _id: String,
    username: String,
    status: String,
    round: Number,
    note: String,
    workExperience: PastWork[],
    education: PastDegree[]
}

const cvDefault: CV = {
    _id: '',
    username: '',
    status: '',
    round: 0,
    note: '',
    workExperience: [],
    education: []
}

const initialState = {
    status: 'idle',
    cv: cvDefault,
    error: ''
}

export const SelectProfile = (state: RootState) => state

const cvSlice = createSlice({
    name: 'cv',
    initialState,
    reducers: {
        
    },
    extraReducers(builder: any) {
        builder
        .addCase(fetchCV.pending, (state: RootState, action: any) => {
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchCV.fulfilled, (state: RootState, action: any) => {
            return {
                state,
                status: "fulfilled",
                cv: action.payload
            }
        })
        .addCase(fetchCV.rejected, (state: RootState, action: any) => {
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const fetchCV = createAsyncThunk('fetch-cv', async (state: RootState) => {
    const username = (state: RootState) => state.me.me.username
    const { success, data } = await fetchInterceptors({
        url: `/cv/${username}`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
      });
    if (success) return data;
    return null;
})

export default cvSlice.reducer