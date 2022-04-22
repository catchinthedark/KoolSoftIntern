import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './view/NavBar';
import LogInForm from './features/me/LogInForm';
import UserPage from './features/me/UserPage';
import SignUpForm from './features/account/SignUpForm';
import HomePage from './view/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe, logout, SelectLoginStatus, SelectMe } from './features/me/meSlice';
import Cookies from 'js-cookie';

function App() {
  const dispatch = useDispatch()

  const isLogin = useSelector(SelectLoginStatus)
  const me = useSelector(SelectMe)
  const loginStatus = Cookies.get('isLogin')
  if (isLogin===true && loginStatus==='false') {
    dispatch(logout({ me }))
  }
  if (isLogin===false && loginStatus==='true') {
    dispatch(fetchMe())
  }

  return (
    <Router>
      <NavBar />
    { isLogin ? 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<UserPage />} />
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
