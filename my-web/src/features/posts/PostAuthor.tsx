import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

export const PostAuthor = ({ userId } : { userId: any }) => {
  const author = useSelector((state:RootState) =>
    state.users.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}