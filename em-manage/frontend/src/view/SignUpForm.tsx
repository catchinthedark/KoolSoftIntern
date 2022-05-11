import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AES } from 'crypto-js'
import { message } from 'antd'
import { PersonalInfo, ContactInfo } from "../features/account/accountsSlice"
import fetchInterceptors from "../utils/fetchInterceptors"

const SignUpForm = () => {
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('HR')
    const [url, setUrl] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [gender, setGender] = useState<string>('Male')
    const [dob, setDOB] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    const onRegisterClicked = async() => {
        if (!firstName || !lastName || !password || !role || !email || !phone) {
            setError('Please fill all required terms!')
            message.error('Please fill all required terms!')
            navigate('/signup')
        } else {
            const personalInfo : PersonalInfo = {
                firstName,
                lastName,
                gender,
                dob
            }
            const contactInfo : ContactInfo = {
                email,
                phone,
                address
            }
            const body = {
                password: AES.encrypt(password, process.env.REACT_APP_ENCRYPTED_KEY!).toString(),
                role,
                personalInfo,
                contactInfo,
                url
            }
            const {success, data} = await fetchInterceptors({
                method: "POST",
                url: `/auth/register`,
                baseUrl: `${process.env.REACT_APP_BASE_URL}`,
                body: body
            })
            if (success) navigate('/login')
            else {
                message.error(data)
                navigate('/signup')    
            }
        }
    }

    return (
        <form onSubmit={(e) => {e.preventDefault();}} autoComplete="off">
        <fieldset className="form">
            <legend>KoolSoft Register</legend>
            <div className="role-element">
                <label form="role">Role</label>
                <select
                    id="role"
                    name="role"
                    required
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="HR">HR</option>
                    <option value="Employee">Employee</option>
                    <option value="Applicant">Applicant</option>
                </select>
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
            <fieldset className="formElement">
                <legend>Personal Information</legend>
                <div className="name-element">
                    <label form="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        placeholder="A"
                        type="text"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />    
                </div>
                <div className="name-element">
                    <label form="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        placeholder="Nguyen Van"
                        type="text"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />    
                </div>
                <div className="gender-element">
                    <label form="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="dob-element">
                    <label form="dob">DOB</label>
                    <input
                        id="dob"
                        name="dob"
                        value={dob}
                        placeholder="dd/mm/yyyy"
                        type="text"
                        onChange={(e) => setDOB(e.target.value)}
                    />    
                </div>
            </fieldset>
            <fieldset className="formElement">
                <legend>Contact Information</legend>
                <div className="email-element">
                    <label form="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        value={email}
                        placeholder="nguyenvana@gmail.com"
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
            </fieldset>
            <div className="url-element">
                <label form="url">URL</label>
                <input
                    id="url"
                    name="url"
                    value={url}
                    placeholder="nguyenvana@github.com"
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
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