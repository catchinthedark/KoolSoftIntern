import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, SelectLoginError, SelectLoginStatus } from "./usersSlice"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const loginStatus = useSelector(SelectLoginStatus)
    const loginError = useSelector(SelectLoginError)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLoginClicked = () => {
        dispatch(login({username, password: parseFloat(password)}))
    }

    if (loginStatus) {
        navigate('/')
    }

    return (
        <form>
        <fieldset className="add-form">
            <legend>Welcome To Our Shop</legend>
            <div className="username">
                <label form="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={username}
                    placeholder="abc"
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
            <button onClick={onLoginClicked}>
                Login
            </button>
            {loginError ? 
                <div>{loginError}</div>
                :
                <div></div>
            }
        </fieldset>
        </form>
    )
}

export default LoginForm