import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isConditionalExpression } from "typescript"
import { RootState } from "../../app/store"

export interface User {
    "id": number,
    "name": string,
    "username": string,
    "password": number,
    "email": string,
    "phone": string,
}

const userDefault: User = {
    "id": 0,
    "name": '',
    "username": '',
    "password": 0,
    "email": '',
    "phone": '',
}

const initialState = {
    users: new Array<User>(),
    status: 'idle',
    login: false,
    user: userDefault,
    error: ''
}

export const SelectUser = (state: RootState) => state.users.user
export const SelectLoginStatus = (state: RootState) => state.users.login
export const SelectLoginError = (state: RootState) => state.users.error

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login(state, action){
            const { username, password } = action.payload
            const foundUser = state.users.find(user => user.username === username)
            if (foundUser && foundUser.password === password) {
                return {
                    ...state,
                    login: true,
                    user: foundUser,
                    error: ''
                }
            } else {
                return {
                    ...state,
                    error: "username or password incorrect!"
                }
            }
        },
        logout(state, action) {
            return {
                ...state,
                login: false,
                user: userDefault,
                error: ''
            }
        }
    },
    extraReducers(builder: any) {
        builder
        .addCase(fetchUsers.pending, (state: RootState, action: any) => {
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchUsers.fulfilled, (state: RootState, action: any) => {
            return {
                state,
                status: "fulfilled",
                users: action.payload
            }
        })
        .addCase(fetchUsers.rejected, (state: RootState, action: any) => {
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const fetchUsers = createAsyncThunk('fetch-users', async () => {
    const response = await fetch("users.json")
    const data = await response.json()
    return data
})

export const { login, logout } = usersSlice.actions
export default usersSlice.reducer