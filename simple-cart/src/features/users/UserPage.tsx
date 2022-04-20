import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, SelectUser } from "./usersSlice"


const UserPage = () => {
    const user = useSelector(SelectUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogOutClicked = () => {
        dispatch(logout({user}))
        navigate('/')
    }

    if (!user) return <div></div>

    return (
        <div>
            <h1>User: {user.name}</h1>
            <h2>Email: {user.email}</h2>
            <h2>Phone number: {user.phone}</h2>
            <br></br>
            <button onClick={onLogOutClicked}>Log Out</button>
        </div>
    )
}

export default UserPage