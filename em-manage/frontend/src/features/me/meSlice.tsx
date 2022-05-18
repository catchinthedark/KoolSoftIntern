import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Account } from "../account/accountsSlice"
import fetchInterceptors from "../../utils/fetchInterceptors"
import { Profile } from "../profile/profilesSlice"
import { AES } from "crypto-js"

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
    myAccount: accountDefault,
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
        .addCase(logout.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(logout.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                myAccount: accountDefault,
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
        .addCase(login.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(login.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                myAccount: action.payload.account,
                myProfile: action.payload.profile,
                login: true,
                status: 'fulfilled',
                error: ''
            }
        })
        .addCase(login.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(updateMyAccount.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending",
            }
        })
        .addCase(updateMyAccount.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                myAccount: action.payload.account
            }
        })
        .addCase(updateMyAccount.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(updateMyProfile.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending",
            }
        })
        .addCase(updateMyProfile.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                myProfile: action.payload.profile
            }
        })
        .addCase(updateMyProfile.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const SelectMyAccount = (state: RootState) => state.me.myAccount
export const SelectMyProfile = (state: RootState) => state.me.myProfile
export const SelectLoginStatus = (state: RootState) => state.me.login
export const SelectMyStatus = (state: RootState) => state.me.status
export const SelectLoginError = (state: RootState) => state.me.error
export const SelectRole = (state: RootState) => state.me.myAccount.role

export const updateMyAccount = createAsyncThunk('update-my-account', async(updatedUser : Account) => {
    const { success, data } = await fetchInterceptors({
        method: "PUT",
        url: `/account/update`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: updatedUser
    })
    return data
})

export const updateMyProfile = createAsyncThunk('update-my-profile', async(updatedProfile : Profile) => {
    const { success, data } = await fetchInterceptors({
        method: "PUT",
        url: `/profile/update`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: updatedProfile
    })
    return data
})

export const login = createAsyncThunk('login', async({ username, password} : {username: string, password: string}) => {
    const {success, data} = await fetchInterceptors({
        method: "POST",
        url: `/auth/login`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: {
            username,
            password: AES.encrypt(password, process.env.REACT_APP_ENCRYPTED_KEY!).toString()
        }
    })
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