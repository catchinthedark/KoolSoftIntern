import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { RootState } from '../../app/store'
import { selectAllPosts, FetchPosts } from './postsSlice'
import { Spinner } from '../spinner'
import { Post } from './postsSlice'

const PostExcerpt = ({ post }: { post: Post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.userId} />
      </div>
      <p className="post-body">{post.body.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  const postsStatus = useSelector((state:RootState) => state.posts.status)
  const error = useSelector((state:RootState) => state.posts.error)

  let content

  if (postsStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postsStatus === 'succeeded') {
    content = posts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postsStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}