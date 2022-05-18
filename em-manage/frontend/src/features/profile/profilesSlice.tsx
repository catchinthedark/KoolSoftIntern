import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import fetchInterceptors from "../../utils/fetchInterceptors"
import { Account, removeAccount } from "../account/accountsSlice"
import { logout } from "../me/meSlice"

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
    status: string,
    note: string,
}

export type Profile = {
    _id: string,
    accountID: string,
    type: string, 
    cvNote: CVNote,
    workInfo: WorkInfo,
    workExperience: PastWork[],
    personalProjects: PastWork[],
    achievements: PastDegree[],
    education: PastDegree[],
}

const initialState = {
    status: 'idle',
    profiles: new Array<Profile>(),
    error: ''
}

const profilesSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers(builder: any) {
        builder
        .addCase(fetchProfiles.pending, (state: RootState, action: any) => {
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchProfiles.fulfilled, (state: RootState, action: any) => {
            return {
                state,
                status: "fulfilled",
                profiles: action.payload
            }
        })
        .addCase(fetchProfiles.rejected, (state: RootState, action: any) => {
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(logout.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                profiles: new Array<Profile>(),
                status: "idle",
                error: ''
            }
        })
        .addCase(updateProfile.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(updateProfile.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fullfilled",
                profiles: action.payload
            }
        })
        .addCase(updateProfile.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(removeAccount.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                profiles: action.payload.profiles
            }
        })
    }
})

export const fetchProfiles = createAsyncThunk('fetch-all-profiles', async() => {
    const { success, data } = await fetchInterceptors({
        url: "/profile/all",
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
      });
    if (success) return data;
    return null;
})

export const updateProfile = createAsyncThunk('update-profile', async({profiles, updatedProfile}: {profiles: Profile[], updatedProfile: Profile}) => {
    const { success, data } = await fetchInterceptors({
        method: "PUT",
        url: `/profile/update`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: updatedProfile
    })
    if (!success) return null
    const updatedProfiles = profiles.map(profile => profile._id === updatedProfile._id ? updatedProfile : profile)
    return updatedProfiles

})

export const SelectAllProfiles = (state: RootState) => state.profiles.profiles
export const SelectProfileByAccount = (account: Account, state: RootState) => {
    return state.profiles.profiles.find(profile => profile.accountID === account._id)
}

export default profilesSlice.reducer