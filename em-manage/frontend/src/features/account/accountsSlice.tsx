import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import fetchInterceptors from "../../utils/fetchInterceptors"

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
    reducers: {
        updateAccounts(state, action) {
            console.log('start updating accounts...') 
            return {
                ...state,
                accounts: action.payload
            }
        },
        resetAccounts(state, action) {
            return {
                ...state,
                accounts: new Array<Account>(),
                status: 'idle',
                error: ''
            }
        }
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

export const fetchAllAccounts = createAsyncThunk('fetch-all-accounts', async () => {
    console.log("fetch all accounts...")
    const { success, data } = await fetchInterceptors({
        url: "/account/all",
        baseUrl: `${process.env.REACT_APP_BASE_URL}`
      });
    if (success) return data;
    return null;
})

export const { updateAccounts, resetAccounts } = accountsSlice.actions
export default accountsSlice.reducer