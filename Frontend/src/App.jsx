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
import PageLoder from './Components/PageLoder.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './Components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import ProtectedRoute from './Components/ProtectedRoute.jsx'


const App = () => {
  const { isLoading, error, authUser } = useAuthUser();
  // select only the theme string from the zustand store
  const theme = useThemeStore((s) => s.theme)

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;




  if (isLoading) return <PageLoder />
  //TODO: Add better error handling page && UI
  if (error) return <div>Failed to load user</div>

  return (
    <div data-theme={theme} className='h-screen'>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}>
          <ProtectedRoute> <HomePage /> </ProtectedRoute> </Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path='/notification' element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route
          path='/onboarding'
          element={
            isAuthenticated ?
              (!isOnboarded ?
                (<OnboardingPage />) :
                (<Navigate to="/" />)
              ) :
              (<Navigate to="/login" />)
          }
        />
      </Routes>
    </div>
  )
}

export default App