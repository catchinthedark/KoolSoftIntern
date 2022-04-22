import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import fetchInterceptors from "../../utils/fetchInterceptors"

export type PersonalInfo = {
    name: String,
    gender: String,
    dob: String,
}

export type ContactInfo = {
    email: String,
    phone: String,
    address: String,
}

export interface Account {
    _id: String,
    username: String,
    password: String,
    role: String,
    personalInfo: PersonalInfo,
    contactInfo: ContactInfo,
    url: String
}

const initialState = {
    accounts: new Array<Account>(),
    status: 'idle',
    error: ''
}

export const SelectAllAccounts = (state: RootState) => state.accounts.accounts
export const SelectAccountsError = (state: RootState) => state.accounts.error
export const SelectAccountsStatus = (state: RootState) => state.accounts.status

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
    },
    extraReducers(builder: any) {
        builder
        .addCase(fetchAllAccounts.pending, (state: RootState, action: any) => {
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchAllAccounts.fulfilled, (state: RootState, action: any) => {
            return {
                state,
                status: "fulfilled",
                accounts: action.payload
            }
        })
        .addCase(fetchAllAccounts.rejected, (state: RootState, action: any) => {
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const fetchAllAccounts = createAsyncThunk('fetch-all', async () => {
    const { success, data } = await fetchInterceptors({
        url: "/account/",
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
      });
    if (success) return data;
    return null;
})

export default accountsSlice.reducer