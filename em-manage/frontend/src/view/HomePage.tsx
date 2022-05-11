import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { accountDefault, fetchMe, SelectLoginStatus, SelectMe } from "../features/me/meSlice"
import Cookies from "js-cookie"

const HomePage = () => {
    const isLogin = useSelector(SelectLoginStatus)
    const me = useSelector(SelectMe)

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
                Welcome to KoolSoft page {me.personalInfo.firstName}!
            </div>
        }  
      </div>
    )
}

export default HomePage