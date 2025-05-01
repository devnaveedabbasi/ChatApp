
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home.jsx'
import SignUpPage from './pages/SignUp.jsx'
import LoginPage from './pages/Login.jsx'
import ProfilePage from './pages/Profile.jsx'
import OtpPage from './pages/VerifyOtp.jsx'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
 
    if (isCheckingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  return (
   <div>


<Routes>
  <Route  path='/' element={authUser ?  <HomePage/> : <Navigate to='/login'/>}/>
  <Route  path='/sign-up' element={<SignUpPage/>}/>
  <Route path="/verify-otp/:userId" element={<OtpPage />} />
  <Route path="/forgot-password" element={<ForgotPassword/>} />
  <Route path="/reset-password/*" element={<ResetPassword />} />
  {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}


  <Route  path='/login' element={ <LoginPage/>}/>
  <Route  path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
</Routes>

   </div>
  )
}

export default App
