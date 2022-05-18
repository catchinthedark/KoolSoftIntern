import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, SelectLoginError } from "./meSlice"

const LogInForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const loginError = useSelector(SelectLoginError)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogInClicked = async () => {
        if (!username || !password) return
        dispatch(login({username, password}))
        navigate('/')
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