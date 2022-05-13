import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Account, editAccount } from "../account/accountsSlice"
import fetchInterceptors from "../../utils/fetchInterceptors"
import { editProfile, Profile } from "../profile/profilesSlice"

export const accountDefault: Account = {
    _id: '',
    username: '',
    password: '',
    role: '',
    personalInfo: {firstName: '', lastName: '', gender: '', dob: ''},
    contactInfo: {email: '', phone: '', address: ''},
    url: ''
}

const profileDefault: Profile = {
    _id: '',
    accountID: '',
    type: '',
    cvNote: { status: '', note: '' },
    workInfo: { department: '', title: '', salary: 0, type: '', hireDate: '' },
    workExperience: [],
    personalProjects: [],
    achievements: [],
    education: []
}

const initialState = {
    me: accountDefault,
    myProfile: profileDefault,
    login: false,
    status: 'idle',
    error: ''
}

const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {},
    extraReducers(builder: any) {
        builder
        .addCase(fetchMe.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(fetchMe.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                login: true,
                me: action.payload
            }
        })
        .addCase(fetchMe.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(fetchMyProfile.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(fetchMyProfile.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                myProfile: action.payload
            }
        })
        .addCase(fetchMyProfile.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(logout.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(logout.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                me: accountDefault,
                myProfile: profileDefault,
                login: false,
                status: 'idle',
                error: ''
            }
        })
        .addCase(logout.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(editAccount.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                me: action.payload.account
            }
        })
        .addCase(editProfile.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                myProfile: action.payload.profile
            }
        })
    }
})

export const SelectMe = (state: RootState) => state.me.me
export const SelectMyProfile = (state: RootState) => state.me.myProfile
export const SelectLoginStatus = (state: RootState) => state.me.login
export const SelectMeStatus = (state: RootState) => state.me.status
export const SelectLoginError = (state: RootState) => state.me.error
export const SelectRole = (state: RootState) => state.me.me.role

export const fetchMe = createAsyncThunk('fetch-me', async (accountID: string) => {
    const { success, data } = await fetchInterceptors({
        method: 'PUT',
        url: `/account/get`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: {
            _id: accountID
        }
    });
    return data
})

export const fetchMyProfile = createAsyncThunk('fetch-profile', async(accountID: string) => {
    const { success, data } = await fetchInterceptors({
        method: 'PUT',
        url: `/profile/get`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: {
            accountID
        }
    });
    return data
})

export const logout = createAsyncThunk('logout', async() => {
    const { success, data } = await fetchInterceptors({
        url: `/auth/logout`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
    })
    return data
})

export default meSlice.reducer