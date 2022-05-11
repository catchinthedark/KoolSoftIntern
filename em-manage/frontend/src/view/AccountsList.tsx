import { Account, SelectAccountsError, SelectAccountsStatus, SelectAllAccounts } from "../features/account/accountsSlice"
import { Spinner } from "../utils/spinner"
import { useSelector } from "react-redux"
import { SelectProfileByAccount } from "../features/profile/profilesSlice"
import UserPage from "./UserPage"
import { RootState } from "../app/store"
import { SelectMe } from "../features/me/meSlice"
import { useState } from "react"

const AccountPreview = ({ account } : { account: Account }) => {
    const [openFlag, setOpenFlag] = useState<boolean>(false)
    const profile = useSelector((state: RootState) => SelectProfileByAccount(account, state))
    return (
        <fieldset className="element">
            <legend>{account.username}</legend>
            <h2>{account.personalInfo.firstName} {account.personalInfo.lastName}</h2>
            <h3>{account.role}</h3>
            <button onClick={() => setOpenFlag(!openFlag)} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                View Account
            </button>
            { openFlag && <UserPage user={account} profile={profile!} setOpenFlag={setOpenFlag}/>}
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