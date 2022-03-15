import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { selectPostById } from '../features/posts/postsSlice'

const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useSelector((state:RootState) => selectPostById(state, parseInt(postId!)))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <Button href={`/posts/edit/${postId}`}>Edit Post</Button>
      </article>
    </section>
  )
}

export default SinglePostPage