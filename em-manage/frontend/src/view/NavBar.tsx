import { Link } from "react-router-dom"
import { SelectLoginStatus } from "../features/me/meSlice"
import { useSelector } from "react-redux"

const NavBar = () => {
    const isLogin = useSelector(SelectLoginStatus)

    return (
        <nav className="navbar">
            <Link to="/" style={{ textDecoration: 'none' }} className="navitem">
                <h1>KOOLSOFT EMPLOYEE MANAGEMENT</h1>
            </Link>
            {isLogin ? 
                <Link to="/me" style={{ textDecoration: 'none' }} className="tag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>
                </Link>
                :
                <Link to="/login" style={{ textDecoration: 'none' }} className="tag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>
                </Link>
            }
        </nav>
    )
}

export default NavBar