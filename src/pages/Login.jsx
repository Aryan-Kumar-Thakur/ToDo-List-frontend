import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link , Navigate } from 'react-router-dom'
import { server } from '../main'
import toast from 'react-hot-toast'
import { Context } from '../main'

const Login = () => {

    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const {isAuthenticated,setisAuthenticated,loading,setloading} = useContext(Context)


    const SubmitHandler = async(e) =>{
        e.preventDefault()
        setloading(true)
        try {
            const {data} = await axios.post(`${server}/users/login`,{email,password},{
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
                <form onSubmit={SubmitHandler}>
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                    <button disabled={loading} type='submit'>Login</button>
                    <h4>Or</h4>
                    <Link to="/register">Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login