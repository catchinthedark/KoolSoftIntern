import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './view/NavBar';
import LogInForm from './view/LogInForm';
import UserPage from './view/UserPage';
import SignUpForm from './view/SignUpForm';
import HomePage from './view/HomePage';
import { useSelector } from 'react-redux';
import { SelectLoginStatus } from './features/me/meSlice';

function App() {
  const isLogin = useSelector(SelectLoginStatus)

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
