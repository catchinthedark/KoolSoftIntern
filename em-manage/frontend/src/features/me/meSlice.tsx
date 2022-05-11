import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Account } from "../account/accountsSlice"
import fetchInterceptors from "../../utils/fetchInterceptors"
import { Profile } from "../profile/profilesSlice"

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
    reducers: {
        updateMe(state, action) {
            console.log('updating me...')
            return {
                ...state,
                me: action.payload
            }
        },
        updateMyProfile(state, action) {
            console.log('updating my profile...')
            return {
                ...state,
                myProfile: action.payload
            }
        },
        logout(state, action) {
            console.log('logging out...')
            return {
                ...state,
                me: accountDefault,
                myProfile: profileDefault,
                login: false,
                error: ''
            }
        }
    },
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
        url: `/account/${accountID}`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
    });
    return data
})

export const fetchMyProfile = createAsyncThunk('fetch-profile', async(accountID: string) => {
    const { success, data } = await fetchInterceptors({
        url: `/profile/${accountID}`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
    });
    return data
})

export const { updateMe, updateMyProfile, logout } = meSlice.actions
export default meSlice.reducer