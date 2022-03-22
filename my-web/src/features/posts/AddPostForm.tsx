import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { User } from '../users/usersSlice'


export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState(0)

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onSavePostClicked = () => {
    dispatch(
      postAdded({
        "userId": userId,
        "id": Date.now() + Math.random(),
        "title": title,
        "body": body
      })
    )

    setTitle('')
    setBody('')
  }

  const canSave = Boolean(title) && Boolean(body) && Boolean(userId)
  const usersOptions = users.map((user: User) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
        />
        <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={userId} onChange={(e) => setUserId(parseInt(e.target.value))}>
            <option value=""></option>
            {usersOptions}
          </select>
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={(e) => {setBody(e.target.value)}}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}