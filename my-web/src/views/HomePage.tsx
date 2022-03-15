import React from 'react'
import { AddPostForm } from '../features/posts/AddPostForm'
import { PostsList } from '../features/posts/PostsList'

const HomePage = () => {
    return (
        <React.Fragment>
            <AddPostForm />
            <PostsList />
        </React.Fragment>
    )
}

export default HomePage