import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AES } from 'crypto-js'
import { message } from 'antd'
import { fetchMe, fetchMyProfile, SelectLoginError } from "./meSlice"
import fetchInterceptors from "../../utils/fetchInterceptors"

const LogInForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const loginError = useSelector(SelectLoginError)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogInClicked = async () => {
        if (!username || !password) return
        const {success, data} = await fetchInterceptors({
            method: "POST",
            url: `/auth/login`,
            baseUrl: `${process.env.REACT_APP_BASE_URL}`,
            body: {
                username,
                password: AES.encrypt(password, process.env.REACT_APP_ENCRYPTED_KEY!).toString()
            }
        })
        if (success) {
            dispatch(fetchMe(data.accountID))
            dispatch(fetchMyProfile(data.accountID))
            navigate('/')
        } else {
            message.error(data)
        }
    }

    const onSignUpClicked = () => {
        navigate('/signup')
    }

    return (
        <form onSubmit={(e) => {e.preventDefault();}} autoComplete="off">
        <fieldset className="form">
            <legend>Welcome To KoolSoft</legend>
            <div className="username">
                <label form="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={username}
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />    
            </div>
            <div className="password">
                <label form="password">Password</label>
                <input 
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={onLogInClicked} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                Log In
            </button>
            {loginError ? 
                <div>{loginError}</div>
                :
                <div></div>
            }
            <div>Don't have an account yet?</div>
            <button onClick={onSignUpClicked} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Sign Up
            </button>
             
        </fieldset>
        </form>
    )
}

export default LogInForm