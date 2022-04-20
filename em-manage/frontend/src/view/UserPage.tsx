import { message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, SelectMe } from "../features/me/meSlice"

const UserPage = () => {
    useDispatch()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const me = useSelector(SelectMe)

    const onLogOutClicked = async () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          }).then((res) => res.json())
          .then((rspBody) => {
              if (rspBody.status) {
                console.log('loging out...')
                dispatch(logout({me}))
                navigate('/')
              } else {
                message.error(rspBody.message)
              }
          })
          .catch((err) => {
              console.log(err)
              message.error(err)
          })
        
    }

    return (
    <div>
        <h1>{me.personalInfo.name}</h1>
        <p>{me.personalInfo.gender}</p>
        <p>{me.contactInfo.email}</p>
        <button onClick={onLogOutClicked} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
            Log Out
        </button>
    </div>
    )
}

export default UserPage