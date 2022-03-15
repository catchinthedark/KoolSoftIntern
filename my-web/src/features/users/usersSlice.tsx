import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useState } from 'react'
import { RootState } from '../../app/store'

export interface User {
    "id": number,
    "name": string,
    "username": string,
    "email": string
}

const initialState = {
    users: new Array<User>(),
    status: 'idle',
    error: null
  }

export const FetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch("users.json")
    const data = await response.json()
    return data
  })

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers(builder: any) {
        builder
        .addCase(FetchUsers.fulfilled, (state:RootState, action: any) => {
            return {
              ...state,
              status: "succeeded",
              error: null,
              users : action.payload
            }
          })
    }
})

export const selectAllUsers = (state:RootState) => state.users.users

export default usersSlice.reducer