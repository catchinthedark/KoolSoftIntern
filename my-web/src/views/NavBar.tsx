import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <nav>
      <section>
        <h1>M Y   W E B</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default NavBar
