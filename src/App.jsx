import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import UserProfile from './pages/auth/userProfile/UserProfile'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
