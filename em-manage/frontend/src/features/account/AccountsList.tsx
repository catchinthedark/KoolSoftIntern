import { Account, removeAccount, SelectAccountsError, SelectAccountsStatus, SelectAllAccounts } from "./accountsSlice"
import { Spinner } from "../../utils/spinner"
import { useSelector } from "react-redux"
import UserPage from "../me/UserPage"
import { SelectMyAccount } from "../me/meSlice"
import { useState } from "react"

const AccountPreview = ({ account } : { account: Account }) => {
    const [openFlag, setOpenFlag] = useState<boolean>(false)
    return (
        <fieldset className="element">
            <legend>{account.username}</legend>
            <h2>{account.personalInfo.firstName} {account.personalInfo.lastName}</h2>
            <h3>{account.role}</h3>
            <button onClick={() => setOpenFlag(!openFlag)} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                View Account
            </button>
            { openFlag && <UserPage user={account} setOpenFlag={setOpenFlag}/>}
            <button onClick={() => removeAccount(account._id)} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                Remove Account
            </button>
        </fieldset>
    )
}

const AccountsList = () => {
    const accounts = useSelector(SelectAllAccounts)
    const status = useSelector(SelectAccountsStatus)
    const error = useSelector(SelectAccountsError)
    const myAccount = useSelector(SelectMyAccount)

    let content

    if (status === "pending") {
        content = <Spinner text="Pending..." />
    } else if (status === "fulfilled") {
        content = accounts.map(account => (
            account._id === myAccount._id ? <div/> : <AccountPreview account={account}/>
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