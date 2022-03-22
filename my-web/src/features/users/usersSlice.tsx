import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers(builder: any) {
        builder
        .addCase(FetchUsers.fulfilled, (state:RootState, action: any) => {
            return {
              state,
              status: "succeeded",
              error: null,
              users : action.payload
            }
          })
    }
})

export const selectAllUsers = (state:RootState) => state.users.users

export const selectUserById = (state: RootState, userId: number) => 
  state.users.users.find(user => user.id === userId)

export const FetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = useSelector(selectAllUsers)
  if (users == null) {
    const response = await fetch("users.json")
    const data = await response.json()
    return data 
  }
  return
})

export default usersSlice.reducer