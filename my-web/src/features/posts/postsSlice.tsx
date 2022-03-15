import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface Post {
  "userId": number,
  "id": number,
  "title": string,
  "body": string
}

const initialState = {
  posts: new Array<Post>(),
  status: 'idle',
  error: null
}

export const FetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch("posts.json")
  const data = await response.json()
  return data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
        state.posts.push(action.payload)
    },
    postUpdated(state, action) {
      const { userId, id, title, body } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.body = body
      }
    }
  },
  extraReducers(builder: any) {
      builder
        .addCase(FetchPosts.pending, (state:RootState, action: any) => {
          return {
            ...state,
            status : 'loading'
          }
        })
        .addCase(FetchPosts.fulfilled, (state:RootState, action: any) => {
          return {
            ...state,
            status : 'succeeded',
            posts : action.payload
          }
        })
        .addCase(FetchPosts.rejected, (state:RootState, action: any) => {
          return {
            ...state,
            status : 'failed',
            posts : action.error.message
          }
        })
    }
  }
)

export const selectAllPosts = (state:RootState) => state.posts.posts

export const selectPostById = (state:RootState, postId:number) =>
  state.posts.posts.find(post => post.id === postId)

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer