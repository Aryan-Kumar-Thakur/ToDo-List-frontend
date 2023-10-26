import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { Context } from '../main'

const Register = () => {

    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const {isAuthenticated,setisAuthenticated,loading,setloading} = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault();
       try {
        const {data} = await axios.post(`${server}/users/new`,
        {name,email,password},
        {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        toast.success(data.message)
        setisAuthenticated(true)
        setloading(false)
       } catch (error) {
           toast.error(error.response.data.message)
           console.log(error)
           setisAuthenticated(false)
           setloading(false)
       }
    }

    if(isAuthenticated) return <Navigate to={"/"}/>

    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Name' value={name} required onChange={(e)=>{setname(e.target.value)}} />
                    <input type="email" placeholder='Email' value={email} required onChange={(e)=>{setemail(e.target.value)}} />
                    <input type="password" placeholder='Password' value={password} required onChange={(e)=>{setpassword(e.target.value)}} />
                    <button type='submit' disabled={loading}>Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Log in</Link>
                </form>
            </section>
        </div>
    )
}

export default Register