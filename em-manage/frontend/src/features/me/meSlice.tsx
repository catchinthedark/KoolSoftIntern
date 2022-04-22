import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Account } from "../account/accountsSlice"
import fetchInterceptors from "../../utils/fetchInterceptors"

export const accountDefault: Account = {
    _id: '',
    username: '',
    password: '',
    role: '',
    personalInfo: {name: '', gender: '', dob: ''},
    contactInfo: {email: '', phone: '', address: ''},
    url: ''
}

const initialState = {
    me: accountDefault,
    login: false,
    status: 'idle',
    error: ''
}

const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        logout(state, action) {
            console.log('logging out...')
            return {
                ...state,
                me: accountDefault,
                login: false,
                error: ''
            }
        }
    },
    extraReducers(builder: any) {
        builder
        .addCase(fetchMe.pending, (state: RootState, action: any) => {
            console.log('fetchMe pending')
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchMe.fulfilled, (state: RootState, action: any) => {
            console.log('fetchMe fulfilled')
            return {
                state,
                status: "fulfilled",
                login: true,
                me: action.payload
            }
        })
        .addCase(fetchMe.rejected, (state: RootState, action: any) => {
            console.log('fetchMe rejected')
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const SelectMe = (state: RootState) => state.me.me
export const SelectLoginStatus = (state: RootState) => state.me.login
export const SelectMeStatus = (state: RootState) => state.me.status
export const SelectLoginError = (state: RootState) => state.me.error

export const fetchMe = createAsyncThunk('fetch-me', async () => {
    const { success, data } = await fetchInterceptors({
        url: "/account/me",
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
      });
    if (success) {
        return data;
    }
    return null;
})

export const { logout } = meSlice.actions
export default meSlice.reducer