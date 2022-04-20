import { Link } from "react-router-dom"
import { Account, SelectAccountsError, SelectAccountsStatus, SelectAllAccounts } from "./accountsSlice"
import { Spinner } from "../../utils/spinner"
import { useSelector } from "react-redux"

const AccountPreview = ({ account } : { account: Account }) => {
    return (
        <div className="card">
            <img src={"https://kenh14cdn.com/thumb_w/660/2019/12/4/jin2-1575437848339284863680.jpeg"} alt="product" width="180"></img>
            <div className="container">
                <h2>{account.username}</h2>
                <h3>{account.role}</h3>
                <Link to={`/account/${account.username}`} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                    View Account
                </Link> 
            </div>
        </div>
    )
}

const AccountsList = () => {
    const accounts = useSelector(SelectAllAccounts)
    const status = useSelector(SelectAccountsStatus)
    const error = useSelector(SelectAccountsError)

    let content

    if (status === "pending") {
        content = <Spinner text="Pending..." />
    } else if (status === "fulfilled") {
        content = accounts.map(account => <AccountPreview account={account}/>)
    } else if (status === "rejected") {
        content = <div>{error}</div>
    }

    return (
        <section className="list">
            {content}
        </section>
    )
}

export default AccountsList