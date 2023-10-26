import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'

const Profile = () => {
    const {User,isAuthenticated,loading} = useContext(Context)
    console.log(User)

  if(!isAuthenticated) return <Navigate to={"/login"}/>
  
  return (
    <>
    {
    (loading) ? <Loader/> :
        <div>
            <h1>{User?.name}</h1>
            <p>{User?.email}</p>
        </div>
    }
    </>
  )
}

export default Profile