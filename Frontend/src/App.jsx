import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import SignUpPage from './Pages/SignUpPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import NotificationPage from './Pages/NotificationsPage.jsx'
import CallPage from './Pages/CallPage.jsx'
import ChatPage from './Pages/ChatPage.jsx'
import OnboardingPage from './Pages/OnbordingPage.jsx'
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from './lib/axios.js'


const App = () => {
  const { data:authData , isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/me')
      return res.data
    },
    retry: false,
  })

  const authUser = authData?.user

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Failed to load user</div>

  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/notification' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App