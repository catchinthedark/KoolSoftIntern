import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../app/store"
import { Account, ContactInfo, updateAccount, PersonalInfo, SelectAllAccounts } from "../account/accountsSlice"
import { Profile, PastWork, CVNote, WorkInfo, PastDegree, updateProfile, SelectProfileByAccount, SelectAllProfiles } from "../profile/profilesSlice"
import { logout, SelectMyAccount, SelectMyProfile, updateMyAccount, updateMyProfile } from "./meSlice"

const UpdateInfo = <T, X, >(info: T, updatedField: string, value: X) : T => {
    const updatedInfo : T = {...info, [updatedField] : value}
    return updatedInfo
}

const UpdateWork = <T, >( work: T, updatedField: string, value: string, works: T[] ) : T[] => {
    const index = works.findIndex((w: T) => w["no" as keyof T] === work["no" as keyof T])
    if (index === -1) {
        return works
    }
    const updatedWork : T = {...work, [updatedField] : value}
    return [...works.slice(0, index), updatedWork, ...works.slice(index + 1)]
}

const checkSelected = <T, >(checkVal: T, baseVal: T) : boolean => {
    if (checkVal === baseVal) return true
    return false
}

const UserPage = ({ user, setOpenFlag } : { user : Account, setOpenFlag: any }) => {
    useDispatch()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const account = useSelector(SelectMyAccount)
    let profile : Profile
    const aProfile : Profile | undefined = useSelector((state: RootState) => SelectProfileByAccount(user, state))
    const myProfile : Profile = useSelector(SelectMyProfile)
    if (account === user) profile = myProfile
        else profile = aProfile!
    const accounts : Account[] = useSelector(SelectAllAccounts)
    const profiles : Profile[] = useSelector(SelectAllProfiles)

    const [updatedUser, setUpdatedUser] = useState<Account>(user)
    const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile!)
    const [roleFlag, setRoleFlag] = useState<boolean>(true)
    const [firstNameFlag, setFirstNameFlag] = useState<boolean>(true)
    const [lastNameFlag, setLastNameFlag] = useState<boolean>(true)
    const [genderFlag, setGenderFlag] = useState<boolean>(true)
    const [dobFlag, setDobFlag] = useState<boolean>(true)
    const [emailFlag, setEmailFlag] = useState<boolean>(true)
    const [phoneFlag, setPhoneFlag] = useState<boolean>(true)
    const [addressFlag, setAddressFlag] = useState<boolean>(true)
    const [urlFlag, setUrlFlag] = useState<boolean>(true)
    const [departmentFlag, setDepartmentFlag] = useState<boolean>(true)
    const [titleFlag, setTitleFlag] = useState<boolean>(true)
    const [hireDateFlag, setHireDateFlag] = useState<boolean>(true)
    const [salaryFlag, setSalaryFlag] = useState<boolean>(true)
    const [typeFlag, setTypeFlag] = useState<boolean>(true)

    const onLogOutClicked = async() => {
        dispatch(logout())
        navigate("/")
    }

    const onSaveEditAccountClicked = async() => {
        if (user === account) dispatch(updateMyAccount(updatedUser))
            else dispatch(updateAccount({ accounts, updatedUser }))
        navigate("/")
    }

    const onSaveEditProfileClicked = async() => {
        if (user === account) dispatch(updateMyProfile(updatedProfile))
            else dispatch(updateProfile({ profiles, updatedProfile }))
        navigate("/")
    }

    const onAddWorkClicked = ( prop: string ) => {
        const newWork : PastWork = {
            no: [updatedProfile[prop as keyof Profile] as PastWork[]][0].length + 1,
            company: '',
            jobTitle: '',
            from: '',
            to: '',
            description: ''
        }
        setUpdatedProfile(prev => ({
            ...prev,
            [prop]: [...(prev[prop as keyof Profile] as PastWork[]), newWork]
        }))
    }

    const onAddDegreeClicked = ( prop: string ) => {
        const newDegree : PastDegree = {
            no: [updatedProfile[prop as keyof Profile] as PastDegree[]][0].length + 1,
            school: '',
            degree: '',
            fieldOfStudy: '',
            yearOfCompletion: '',
            description: ''
        }
        setUpdatedProfile(prev => ({
            ...prev,
            [prop]: [...(prev[prop as keyof Profile] as PastDegree[]), newDegree]
        }))
    }

    return (
    <div className="account-background">
    <div className="account-container">
        <h1>{user.username}</h1>
        <h2>{user.role}</h2>
        <div className="role-element">
            <label form="role">Role</label>
            <select
                id="role"
                name="role"
                required
                disabled={roleFlag}
                onChange={(e) => {
                    setUpdatedUser(prev => ({
                        ...prev,
                        role: e.target.value
                    }))
                }}
            >
                <option value="HR" selected={checkSelected<string>("HR", updatedUser.role)}>HR</option>
                <option value="Employee" selected={checkSelected<string>("Employee", updatedUser.role)}>Employee</option>
                <option value="Applicant" selected={checkSelected<string>("Applicant", updatedUser.role)}>Applicant</option>
            </select>
            <button className="edit" onClick={() => setRoleFlag(!roleFlag)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
            </button>
        </div>
        <fieldset className="formElement">
            <legend>Personal Information</legend>
            <div className="name-element">
                <label form="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    value={updatedUser.personalInfo.firstName}
                    type="text"
                    readOnly={firstNameFlag}
                    onChange={(e) => {
                        setUpdatedUser(prev => ({
                            ...prev,
                            personalInfo: UpdateInfo<PersonalInfo, string>(prev.personalInfo, "firstName", e.target.value)
                        }))
                    }}
                />    
                <button className="edit" onClick={() => setFirstNameFlag(!firstNameFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
            <div className="name-element">
                <label form="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    value={updatedUser.personalInfo.lastName}
                    type="text"
                    readOnly={lastNameFlag}
                    onChange={(e) => {
                        setUpdatedUser(prev => ({
                            ...prev,
                            personalInfo: UpdateInfo<PersonalInfo, string>(prev.personalInfo, "lastName", e.target.value)
                        }))
                    }}
                /> 
                <button className="edit" onClick={() => setLastNameFlag(!lastNameFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
            <div className="gender-element">
                <label form="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    required
                    disabled={genderFlag}
                    onChange={(e) => {
                        setUpdatedUser(prev => ({
                            ...prev,
                            personalInfo: UpdateInfo<PersonalInfo, string>(prev.personalInfo, "gender", e.target.value)
                        }))
                    }}
                >
                    <option value="Male" selected={checkSelected<string>("Male", updatedUser.personalInfo.gender)}>Male</option>
                    <option value="Female" selected={checkSelected<string>("Female", updatedUser.personalInfo.gender)}>Female</option>
                    <option value="Other" selected={checkSelected<string>("Other", updatedUser.personalInfo.gender)}>Other</option>
                </select>
                <button className="edit" onClick={() => setGenderFlag(!genderFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
            <div className="dob-element">
                <label form="dob">DOB</label>
                <input
                    id="dob"
                    name="dob"
                    value={updatedUser.personalInfo.dob}
                    type="text"
                    readOnly={dobFlag}
                    onChange={(e) => {
                        setUpdatedUser(prev => ({
                            ...prev,
                            personalInfo: UpdateInfo<PersonalInfo, string>(prev.personalInfo, "dob", e.target.value)
                        }))
                    }}
                />    
                <button className="edit" onClick={() => setDobFlag(!dobFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
        </fieldset>
        <fieldset className="formElement">
            <legend>Contact Information</legend>
            <div className="email-element">
                <label form="email">Email</label>
                <input
                    id="email"
                    name="email"
                    value={updatedUser.contactInfo.email}
                    type="email"
                    required
                    readOnly={emailFlag}
                    onChange={(e) => (
                        setUpdatedUser(prev => ({
                            ...prev,
                            contactInfo: UpdateInfo<ContactInfo, string>(prev.contactInfo, "email", e.target.value)
                        }))
                    )}
                />
                <button className="edit" onClick={() => setEmailFlag(!emailFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>    
            </div>
            <div className="phone-element">
                <label form="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    value={updatedUser.contactInfo.phone}
                    type="text"
                    required
                    readOnly={phoneFlag}
                    onChange={(e) => (
                        setUpdatedUser(prev => ({
                            ...prev,
                            contactInfo: UpdateInfo<ContactInfo, string>(prev.contactInfo, "phone", e.target.value)
                        }))
                    )}
                />  
                <button className="edit" onClick={() => setPhoneFlag(!phoneFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>  
            </div>
            <div className="address-element">
                <label form="address">Address</label>
                <input
                    id="address"
                    name="address"
                    value={updatedUser.contactInfo.address}
                    type="text"
                    readOnly={addressFlag}
                    onChange={(e) => (
                        setUpdatedUser(prev => ({
                            ...prev,
                            contactInfo: UpdateInfo<ContactInfo, string>(prev.contactInfo, "address", e.target.value)
                        }))
                    )}
                />    
                <button className="edit" onClick={() => setAddressFlag(!addressFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
        </fieldset>
            <div className="url-element">
                <label form="url">URL</label>
                <input
                    id="url"
                    name="url"
                    value={updatedUser.url}
                    type="text"
                    readOnly={urlFlag}
                    onChange={(e) => (
                        setUpdatedUser(prev => ({
                            ...prev,
                            url: e.target.value
                        }))
                    )}
                />   
                <button className="edit" onClick={() => setUrlFlag(!urlFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button> 
            </div>
        <button onClick={onSaveEditAccountClicked} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
            Save Edit Account
        </button>
        {
            user.role === 'Applicant' && account.role === 'HR' ? 
            <fieldset>
                <legend>CV Note</legend>
                <div className="status-element">
                    <label form="cv-status">Status</label>
                    <select
                        id="cv-status"
                        name="cv-status"
                        required
                        onChange={(e) => (
                            setUpdatedProfile(prev => ({
                                ...prev,
                                cvNote: UpdateInfo<CVNote, string>(prev.cvNote, "status", e.target.value)
                            }))
                        )}
                    >
                        <option value="under review" selected={checkSelected<string>("under review", updatedProfile.cvNote.status)}>Under Review</option>
                        <option value="interview offered" selected={checkSelected<string>("interview offered", updatedProfile.cvNote.status)}>Interview Offered</option>
                        <option value="job offered" selected={checkSelected<string>("job offered", updatedProfile.cvNote.status)}>Job Offered</option>
                        <option value="closed" selected={checkSelected<string>("closed", updatedProfile.cvNote.status)}>Closed</option>
                    </select>
                </div>
                <div className="cv-note-element">
                    <label form="cv-note">Note</label>
                    <input 
                        id="cv-note"
                        name="cv-note"
                        required
                        type="text"
                        value={updatedProfile.cvNote.note}
                        onChange={(e) => (
                            setUpdatedProfile(prev => ({
                                ...prev,
                                cvNote: UpdateInfo<CVNote, string>(prev.cvNote, "note", e.target.value)
                            }))
                        )}
                    />
                </div>
            </fieldset>
            :
            <div></div>
        }
        <fieldset>
            <legend>Work Information</legend>
            <div className="department-element">
                <label form="department">Department</label>
                <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    readOnly={departmentFlag}
                    value={updatedProfile.workInfo.department}
                    onChange={(e) => (
                        setUpdatedProfile(prev => ({
                            ...prev,
                            workInfo: UpdateInfo<WorkInfo, string>(prev.workInfo, "department", e.target.value)
                        }))
                    )}
                />
                <button className="edit" onClick={() => setDepartmentFlag(!departmentFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
            <div className="title-element">
                <label form="title">Title</label>
                <input
                    id="title"
                    name='title'
                    type="text"
                    required
                    readOnly={titleFlag}
                    value={updatedProfile.workInfo.title}
                    onChange={(e) => (
                        setUpdatedProfile(prev => ({
                            ...prev,
                            workInfo: UpdateInfo<WorkInfo, string>(prev.workInfo, "title", e.target.value)
                        }))
                    )}
                />
                <button className="edit" onClick={() => setTitleFlag(!titleFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
            {
                account.role === 'HR' ? 
                <div>
                    <label form="salary">Salary</label>
                    <input 
                        id="salary"
                        name="salary"
                        required
                        type="number"
                        readOnly={salaryFlag}
                        value={updatedProfile.workInfo.salary}
                        onChange={(e) => (
                            setUpdatedProfile(prev => ({
                                ...prev,
                                workInfo: UpdateInfo<WorkInfo, number>(prev.workInfo, "salary", parseInt(e.target.value))
                            }))
                        )}
                    />
                    <button className="edit" onClick={() => setSalaryFlag(!salaryFlag)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                    <br></br>
                    <label form="type">Type</label>
                    <select
                        id="type"
                        name="type"
                        required
                        disabled={typeFlag}
                        onChange={(e) => (
                            setUpdatedProfile(prev => ({
                                ...prev,
                                workInfo: UpdateInfo<WorkInfo, string>(prev.workInfo, "type", e.target.value)
                            }))
                        )}
                    >
                        <option value="Intern" selected={checkSelected<string>("Intern", updatedProfile.workInfo.type)}>Intern</option>
                        <option value="Part Time" selected={checkSelected<string>("Part Time", updatedProfile.workInfo.type)}>Part Time</option>
                        <option value="Full Time" selected={checkSelected<string>("Full Time", updatedProfile.workInfo.type)}>Full Time</option>
                    </select>
                    <button className="edit" onClick={() => setTypeFlag(!typeFlag)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                </div>
                :
                <div></div>
            }
            <div className="hireDate-element">
                <label form="hireDate">Hire Date</label>
                <input
                    id="hireDate"
                    name='hireDate'
                    type="text"
                    required
                    readOnly={hireDateFlag}
                    value={updatedProfile.workInfo.hireDate}
                    onChange={(e) => (
                        setUpdatedProfile(prev => ({
                            ...prev,
                            workInfo: UpdateInfo<WorkInfo, string>(prev.workInfo, "hireDate", e.target.value)
                        }))
                    )}
                />
                <button className="edit" onClick={() => setHireDateFlag(!hireDateFlag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkolivegreen" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
        </fieldset>
        <fieldset>
            <legend>Work Experience</legend>
            <table>
                <tr>
                    <th>No</th>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Begin Work</th>
                    <th>End Work</th>
                    <th>Work Description</th>
                </tr>
                {
                    updatedProfile.workExperience.map(work => 
                    <tr>
                        <td>{work.no}</td>
                        <td>
                            <input 
                                id="company"
                                name="company"
                                required
                                type="text"
                                value={work.company}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        workExperience: UpdateWork<PastWork>(work, "company", e.target.value, prev.workExperience)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="jobTitle"
                                name="jobTitle"
                                required
                                type="text"
                                value={work.jobTitle}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        workExperience: UpdateWork<PastWork>(work, "jobTitle", e.target.value, prev.workExperience)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="from"
                                name="from"
                                required
                                type="text"
                                value={work.from}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        workExperience: UpdateWork<PastWork>(work, "from", e.target.value, prev.workExperience)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="to"
                                name="to"
                                required
                                type="text"
                                value={work.to}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        workExperience: UpdateWork<PastWork>(work, "to", e.target.value, prev.workExperience)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="description"
                                name="description"
                                required
                                type="text"
                                value={work.description}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        workExperience: UpdateWork<PastWork>(work, "description", e.target.value, prev.workExperience)
                                    }))
                                )}
                            />   
                        </td>
                    </tr>)
                }
            </table>
            <button onClick={() => onAddWorkClicked("workExperience")} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Add Work
            </button>
        </fieldset>
        <fieldset>
            <legend>Personal Projects</legend>
            <table>
                <tr>
                    <th>No</th>
                    <th>Position</th>
                    <th>Project Name</th>
                    <th>Begin Project</th>
                    <th>End Project</th>
                    <th>Project Description</th>
                </tr>
                {
                    updatedProfile.personalProjects.map(project => 
                    <tr>
                        <td>{project.no}</td>
                        <td>
                            <input 
                                id="position"
                                name="position"
                                required
                                type="text"
                                value={project.company}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        personalProjects: UpdateWork<PastWork>(project, "company", e.target.value, prev.personalProjects)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="projectName"
                                name="projectName"
                                required
                                type="text"
                                value={project.jobTitle}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        personalProjects: UpdateWork<PastWork>(project, "jobTitle", e.target.value, prev.personalProjects)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="from"
                                name="from"
                                required
                                type="text"
                                value={project.from}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        personalProjects: UpdateWork<PastWork>(project, "from", e.target.value, prev.personalProjects)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="to"
                                name="to"
                                required
                                type="text"
                                value={project.to}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        personalProjects: UpdateWork<PastWork>(project, "to", e.target.value, prev.personalProjects)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="description"
                                name="description"
                                required
                                type="text"
                                value={project.description}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        personalProjects: UpdateWork<PastWork>(project, "description", e.target.value, prev.personalProjects)
                                    }))
                                )}
                            />   
                        </td>
                    </tr>)
                }
            </table>
            <button onClick={() => onAddWorkClicked("personalProjects")} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Add Project
            </button>
        </fieldset>
        <fieldset>
            <legend>Achievements</legend>
            <table>
                <tr>
                    <th>No</th>
                    <th>Award Name</th>
                    <th>Role</th>
                    <th>Field</th>
                    <th>Duration</th>
                    <th>Description</th>
                </tr>
                {
                    updatedProfile.achievements.map(award => 
                    <tr>
                        <td>{award.no}</td>
                        <td>
                            <input 
                                id="awardName"
                                name="awardName"
                                required
                                type="text"
                                value={award.school}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        achievements: UpdateWork<PastDegree>(award, "school", e.target.value, prev.achievements)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="yourRole"
                                name="yourRole"
                                required
                                type="text"
                                value={award.degree}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        achievements: UpdateWork<PastDegree>(award, "degree", e.target.value, prev.achievements)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="field"
                                name="field"
                                required
                                type="text"
                                value={award.fieldOfStudy}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        achievements: UpdateWork<PastDegree>(award, "fieldOfStudy", e.target.value, prev.achievements)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="duration"
                                name="duration"
                                required
                                type="text"
                                value={award.yearOfCompletion}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        achievements: UpdateWork<PastDegree>(award, "yearOfCompletion", e.target.value, prev.achievements)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="description"
                                name="description"
                                required
                                type="text"
                                value={award.description}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        achievements: UpdateWork<PastDegree>(award, "description", e.target.value, prev.achievements)
                                    }))
                                )}
                            />   
                        </td>
                    </tr>)
                }
            </table>
            <button onClick={() => onAddDegreeClicked("achievements")} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Add Award
            </button>
        </fieldset>
        <fieldset>
            <legend>Education</legend>
            <table>
                <tr>
                    <th>No</th>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Field of Study</th>
                    <th>Year of Completion</th>
                    <th>Description</th>
                </tr>
                {
                    updatedProfile.education.map(degree => 
                    <tr>
                        <td>{degree.no}</td>
                        <td>
                            <input 
                                id="school"
                                name="school"
                                required
                                type="text"
                                value={degree.school}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        education: UpdateWork<PastDegree>(degree, "school", e.target.value, prev.education)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="degree"
                                name="degree"
                                required
                                type="text"
                                value={degree.degree}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        education: UpdateWork<PastDegree>(degree, "degree", e.target.value, prev.education)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="fieldOfStudy"
                                name="fieldOfStudy"
                                required
                                type="text"
                                value={degree.fieldOfStudy}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        education: UpdateWork<PastDegree>(degree, "fieldOfStudy", e.target.value, prev.education)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="yearOfCompletion"
                                name="yearOfCompletion"
                                required
                                type="text"
                                value={degree.yearOfCompletion}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        education: UpdateWork<PastDegree>(degree, "yearOfCompletion", e.target.value, prev.education)
                                    }))
                                )}
                            />   
                        </td>
                        <td>
                            <input 
                                id="description"
                                name="description"
                                required
                                type="text"
                                value={degree.description}
                                onChange={(e) => (
                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        education: UpdateWork<PastDegree>(degree, "description", e.target.value, prev.education)
                                    }))
                                )}
                            />   
                        </td>
                    </tr>)
                }
            </table>
            <button onClick={() => onAddDegreeClicked("education")} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Add Degree
            </button>
        </fieldset>
        <button onClick={onSaveEditProfileClicked} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
            Save Edit Profile
        </button>
        <br></br>
        {
            user === account ? 
            <button onClick={onLogOutClicked} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Log Out
            </button>
            :
            <div></div>
        }
        {
            setOpenFlag ? 
            <button onClick={() => setOpenFlag(false)} style={{ padding: '0.5rem 1rem', color:"white", textDecoration: 'none', backgroundColor: "darkolivegreen" }}>
                Close
            </button>
            :
            <div></div>
        }
    </div>
    </div>
    )
}

export default UserPage