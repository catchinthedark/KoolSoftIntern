import { Account, SelectAccountsError, SelectAccountsStatus, SelectAllAccounts, updateAccounts } from "../features/account/accountsSlice"
import { Spinner } from "../utils/spinner"
import { useDispatch, useSelector } from "react-redux"
import { SelectProfileByAccount, updateProfiles } from "../features/profile/profilesSlice"
import UserPage from "./UserPage"
import { RootState } from "../app/store"
import { SelectMe } from "../features/me/meSlice"
import { useState } from "react"
import fetchInterceptors from "../utils/fetchInterceptors"
import { useNavigate } from "react-router-dom"
import { message } from "antd"

const AccountPreview = ({ account } : { account: Account }) => {
    const dispatch = useDispatch()
    const [openFlag, setOpenFlag] = useState<boolean>(false)
    const profile = useSelector((state: RootState) => SelectProfileByAccount(account, state))

    const onRemoveAccountClicked = async() => {
        const {success, data} = await fetchInterceptors({
            method: 'DELETE',
            url: `/account/delete`,
            baseUrl: `${process.env.REACT_APP_BASE_URL}`,
            body: {
                _id: account._id
            }
        })
        if (success) {
            dispatch(updateAccounts(data.accounts))
            dispatch(updateProfiles(data.profiles))
        } else {
            message.error(data)
        }
    }

    return (
        <fieldset className="element">
            <legend>{account.username}</legend>
            <h2>{account.personalInfo.firstName} {account.personalInfo.lastName}</h2>
            <h3>{account.role}</h3>
            <button onClick={() => setOpenFlag(!openFlag)} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                View Account
            </button>
            { openFlag && <UserPage user={account} profile={profile!} setOpenFlag={setOpenFlag}/>}
            <button onClick={onRemoveAccountClicked} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                Remove Account
            </button>
        </fieldset>
    )
}

const AccountsList = () => {
    const accounts = useSelector(SelectAllAccounts)
    const status = useSelector(SelectAccountsStatus)
    const error = useSelector(SelectAccountsError)
    const me = useSelector(SelectMe)

    let content

    if (status === "pending") {
        content = <Spinner text="Pending..." />
    } else if (status === "fulfilled") {
        content = accounts.map(account => (
            account._id === me._id ? <div/> : <AccountPreview account={account}/>
        ))
    } else if (status === "rejected") {
        content = <div>{error}</div>
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default AccountsList