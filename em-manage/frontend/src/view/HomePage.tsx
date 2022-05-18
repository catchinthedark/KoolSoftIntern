import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {SelectLoginStatus, SelectMyAccount } from "../features/me/meSlice"

const HomePage = () => {
    const isLogin = useSelector(SelectLoginStatus)
    const account = useSelector(SelectMyAccount)

    return (
      <div>
        { !isLogin ? 
            <div>
                <p>Welcome to KoolSoft page!</p>
                <p>Please login to continue...</p>
                <br></br>
                <Link to={'/login'} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                    To Login Page
                </Link> 
            </div>
            :
            <div>
                Welcome to KoolSoft page {account.personalInfo.firstName}!
            </div>
        }  
      </div>
    )
}

export default HomePage