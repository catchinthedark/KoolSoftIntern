import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../features/users/usersSlice'
import { selectAllPosts } from '../features/posts/postsSlice'

const SingleUserPage = () => {
  const { userId } = useParams()

  const user = useSelector((state:RootState) => selectUserById(state, parseFloat(userId!)))

  if (!user) {
      return <h3>User not found!</h3>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const postsByUser = useSelector((state: RootState) => {
      const posts = selectAllPosts(state)
      return posts.filter(post => post.userId === user!.id)
  })

  const postTitles = postsByUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <article className="user">
        <h2>{user.name}</h2>
        <h4>Email: {user.email}</h4>
        <ul>{postTitles}</ul>
      </article>
    </section>
  )
}

export default SingleUserPage