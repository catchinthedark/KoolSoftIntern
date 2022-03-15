import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './views/NavBar'
import HomePage from './views/HomePage'
import SinglePostPage from './views/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/posts/:postId" element={<SinglePostPage />}/>
          <Route path="/posts/edit/:postId" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App