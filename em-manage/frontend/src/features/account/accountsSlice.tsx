import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import fetchInterceptors from "../../utils/fetchInterceptors"
import { logout } from "../me/meSlice"

export type PersonalInfo = {
    firstName: string,
    lastName: string,
    gender: string,
    dob: string,
}

export type ContactInfo = {
    email: string,
    phone: string,
    address: string,
}

export type Account = {
    _id: string,
    username: string,
    password: string,
    role: string,
    personalInfo: PersonalInfo,
    contactInfo: ContactInfo,
    url: string
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
    reducers: {},
    extraReducers(builder: any) {
        builder
        .addCase(fetchAllAccounts.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(fetchAllAccounts.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                accounts: action.payload
            }
        })
        .addCase(fetchAllAccounts.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(logout.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                accounts: new Array<Account>(),
                status: "idle",
                error: ''
            }
        })
        .addCase(editAccount.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(editAccount.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fullfilled",
                accounts: action.payload.accounts
            }
        })
        .addCase(editAccount.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
        .addCase(removeAccount.pending, (state: RootState, action: any) => {
            return {
                ...state,
                status: "pending"
            }
        })
        .addCase(removeAccount.fulfilled, (state: RootState, action: any) => {
            return {
                ...state,
                status: "fulfilled",
                accounts: action.payload.accounts
            }
        })
        .addCase(removeAccount.rejected, (state: RootState, action: any) => {
            return {
                ...state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const fetchAllAccounts = createAsyncThunk('fetch-all-accounts', async() => {
    const { success, data } = await fetchInterceptors({
        url: "/account/all",
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
      });
    if (success) return data;
    return null;
})

export const editAccount = createAsyncThunk('edit-account', async(updatedUser: Account) => {
    const { success, data } = await fetchInterceptors({
        method: "PUT",
        url: `/account/update`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: updatedUser
    })
    return data
})

export const removeAccount = createAsyncThunk('remove-account', async(accountID: string) => {
    const { success, data } = await fetchInterceptors({
        method: 'DELETE',
        url: `/account/delete`,
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        body: {
            _id: accountID
        }
    })
    return data
})

export default accountsSlice.reducer