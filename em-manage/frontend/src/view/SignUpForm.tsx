import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AES } from 'crypto-js'
import { message } from 'antd'
import { PersonalInfo, ContactInfo } from "../features/account/accountsSlice"

const SignUpForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('HR')
    const [url, setUrl] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<string>('Male')
    const [dob, setDOB] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    const onSelectRoleChanged = () => {
        setRole(document.getElementById("role")!.textContent!)
    }

    const onSelectGenderChanged = () => {
        setGender(document.getElementById("gender")!.textContent!)
    }

    const onRegisterClicked = () => {
        if (!username || !password || !role || !name || !email || !phone) {
            setError('Please fill all required terms!')
            message.error('Please fill all required terms!')
            navigate('/signup')
        } else {
            const personalInfo : PersonalInfo = {
                name,
                gender,
                dob
            }
            const contactInfo : ContactInfo = {
                email,
                phone,
                address
            }
            fetch(`${process.env.REACT_APP_BASE_URL}/account/add`, {
                method: "POST",
                body: JSON.stringify({
                  username,
                  password: AES.encrypt(password, process.env.REACT_APP_ENCRYPTED_KEY!).toString(),
                  role,
                  personalInfo,
                  contactInfo,
                  url
                }),
                headers: { "Content-Type": "application/json" }
              })
            .then((res) => res.json())
            .then((rspBody) => {
                console.log('sign up done')
                if (!rspBody.status) {
                    message.error(rspBody.data) 
                    navigate('/signup')
                } else {
                    navigate('/login')
                }
            })
            .catch((e) => {
                console.error((e));
                message.error("Error");
                return;
            })
        }
    }

    return (
        <form onSubmit={(e) => {e.preventDefault();}} autoComplete="off">
        <fieldset className="form">
            <legend>KoolSoft Register</legend>
            <div className="username-element">
                <label form="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={username}
                    placeholder="jin"
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />    
            </div>
            <div className="password-element">
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
            <div className="role-element">
                <label form="role">Role</label>
                <select
                    id="role"
                    name="role"
                    required
                    onChange={onSelectRoleChanged}
                >
                    <option value="HR">HR</option>
                    <option value="Employee">Employee</option>
                    <option value="Applicant">Applicant</option>
                </select>
            </div>
            <div className="url-element">
                <label form="url">URL</label>
                <input
                    id="url"
                    name="username"
                    value={url}
                    placeholder="jin@github.com"
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                />    
            </div>
            <div className="name-element">
                <label form="name">Full Name</label>
                <input
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Kim Seokjin"
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                />    
            </div>
            <div className="gender-element">
                <label form="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    onChange={onSelectGenderChanged}
                >
                    <option value="Female">Male</option>
                    <option value="Male">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="dob-element">
                <label form="dob">DOB</label>
                <input
                    id="dob"
                    name="dob"
                    value={dob}
                    placeholder="04/12/1992"
                    type="text"
                    onChange={(e) => setDOB(e.target.value)}
                />    
            </div>
            <div className="email-element">
                <label form="email">Email</label>
                <input
                    id="email"
                    name="email"
                    value={email}
                    placeholder="jin.wwh@gmail.com"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />    
            </div>
            <div className="phone-element">
                <label form="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="0123xxxxxx78"
                    type="text"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                />    
            </div>
            <div className="address-element">
                <label form="address">Address</label>
                <input
                    id="address"
                    name="address"
                    value={address}
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                />    
            </div>
            <button onClick={onRegisterClicked} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                Submit Register
            </button>
            {error ? 
                <div>{error}</div>
                :
                <div></div>
            }
        </fieldset>
        </form>
    )
}

export default SignUpForm