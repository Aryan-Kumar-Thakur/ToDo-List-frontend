import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { Context, server } from './main'
import axios from 'axios'

const App = () => {

  const {setUser,setisAuthenticated,setloading} = useContext(Context)

useEffect(()=>{
  setloading(true)
  axios.get(`${server}/users/me`,{
    withCredentials:true,
  }).then((res)=>{
    setUser(res.data.user)
    setisAuthenticated(true)
    setloading(false)
  }).catch((err)=>{
    console.log("login first")
    setUser({})
    setisAuthenticated(false)
    setloading(false)
  })
},[])

  return (
    <BrowserRouter>
    <Header/>
        <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/profile" element = {<Profile/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/register" element = {<Register/>} />
        </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App