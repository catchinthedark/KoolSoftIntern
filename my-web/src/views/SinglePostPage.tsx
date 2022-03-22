import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from '../features/posts/postsSlice'
import { PostAuthor } from '../features/posts/PostAuthor'

const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useSelector((state:RootState) => selectPostById(state, parseFloat(postId!)))

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
        <div>
          <PostAuthor userId={post.userId} />
        </div>
        <p className="post-body">{post.body}</p>
        <Link to={`/posts/edit/${post.id}`} className="button muted-button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage