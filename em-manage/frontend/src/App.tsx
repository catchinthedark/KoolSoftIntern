import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './view/NavBar';
import LogInForm from './features/me/LogInForm';
import UserPage from './features/me/UserPage';
import SignUpForm from './view/SignUpForm';
import HomePage from './view/HomePage';
import AccountsList from './features/account/AccountsList';

import { useDispatch, useSelector } from 'react-redux';
import { logout, SelectLoginStatus, SelectMyAccount } from './features/me/meSlice';
import Cookies from 'js-cookie';
import { fetchAllAccounts, SelectAccountsStatus } from './features/account/accountsSlice';
import { fetchProfiles, SelectProfilesStatus } from './features/profile/profilesSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()

  const isLogin = useSelector(SelectLoginStatus)
  const loginStatus = Cookies.get('isLogin')
  const account = useSelector(SelectMyAccount)
  const accountsStatus = useSelector(SelectAccountsStatus)
  const profilesStatus = useSelector(SelectProfilesStatus)

  if (isLogin && !loginStatus) {
    dispatch(logout())
  }
  if (account.role === 'HR' && accountsStatus === 'idle' && profilesStatus === 'idle') {
    dispatch(fetchAllAccounts())
    dispatch(fetchProfiles())
  }

  return (
    <Router>
      <NavBar />
    { isLogin ? 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<UserPage user={account} setOpenFlag={null} />} />
        <Route path="/accounts" element={<AccountsList />} /> 
        <Route path="/login" element={<LogInForm />} />
      </Routes>
      :
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
      
    }
    </Router>
  );
}

export default App;
