import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import Todoitems from '../components/Todoitems'
import { Navigate } from 'react-router-dom'

const Home = () => {

  const [title,settitle]=useState("")
  const [description,setdescription]=useState("")
  const [loading,setloading] = useState(false)
  const [tasks,settasks]=useState([])
  const [refresh,setrefresh] = useState(false)
  const {isAuthenticated} = useContext(Context)

  const SubmitHandler = async(e) =>{
    e.preventDefault()
    setloading(true)
    try {
      const {data} = await axios.post(`${server}/tasks/new`,{title,description},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      })
      settitle("")
      setdescription("")
      toast.success(data.message)
      setloading(false)
      setrefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setloading(false)
    }
  }

  const updateHandler = async(id)=>{
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},{
        withCredentials:true,
      })
    toast.success(data.message)
    setrefresh(prev => !prev)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  const deleteHandler = async(id)=>{
    try {
      const {data} = await axios.delete(`${server}/tasks/${id}`,{
        withCredentials:true,
      })
    toast.success(data.message)
    setrefresh(prev => !prev)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(()=>{
    axios.get(`${server}/tasks/my`,{
      withCredentials:true,
    }).then((res)=>{
      settasks(res.data.tasks)
    }).catch((err)=>{
      toast.error(err.response.data.message)
      console.log(err)
    })
  },[refresh])

  if(!isAuthenticated) return <Navigate to={"/login"}/>

  return (
    <div className='container'>
    <div className="login">
    <section>
      <form onSubmit={SubmitHandler}>
        <input type="text" placeholder='Title' value={title} onChange={(e) => { settitle(e.target.value) }} />
        <input type="text" placeholder='Description' value={description} onChange={(e) => { setdescription(e.target.value) }} />
        <button disabled={loading} type='submit'>Add Task</button>
      </form>
      </section>
      </div>
      <section className="todosContainer">
      {
        tasks.map(i=>(
          <Todoitems title={i.title} description={i.description} isCompleted = {i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))
      }
      </section>
    </div>
  )
}

export default Home