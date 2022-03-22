import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { useParams, useNavigate } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()

  const post = useSelector((state:RootState) => selectPostById(state, parseFloat(postId!)))

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onSavePostClicked = () => {
      if (title && body) {
          dispatch(postUpdated({userId: post.userId, id: post.id, title, body}))
          navigate(`/posts/${postId}`)
      }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postBody">Content:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}

export default EditPostForm