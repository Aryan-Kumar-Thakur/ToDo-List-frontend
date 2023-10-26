import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../main'
const Header = () => {

  const {isAuthenticated,setisAuthenticated,loading,setloading} = useContext(Context)

  const logoutHandler = async() =>{
    setloading(true)
    try {
       await axios.get(`${server}/users/logout`,{
          withCredentials:true,
      })
      toast.success("logout successfully")
      setisAuthenticated(false)
      setloading(false)
  } catch (error) {
    toast.error("some error")
    console.log(error)
    setisAuthenticated(true)
    setloading(false)
  }
  }

  return (
    <nav className='header'>
        <div>
            <h2>Todo App</h2>
        </div>
        <article>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            {
            (isAuthenticated) ?
            <button onClick={logoutHandler} disabled={loading} className='btn'>logout</button> : <Link to={"/login"}>login</Link>
            }
        </article>
    </nav>
  )
}

export default Header