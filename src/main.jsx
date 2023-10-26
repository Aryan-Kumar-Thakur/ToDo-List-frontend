import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'
import { createContext } from 'react'

export const server = "https://node-todoapp-hlix.onrender.com/api/v1"

export const Context = createContext({isAuthenticated:false})

const AppWrapper = ()=>{
  const [isAuthenticated,setisAuthenticated] = useState(false)
  const [loading,setloading] = useState(false)
  const [User,setUser] = useState({})
  return(
  <Context.Provider value={{
    isAuthenticated,
    setisAuthenticated,
    loading,
    setloading,
    User,
    setUser
  }}>
    <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AppWrapper/>
  </React.StrictMode>,
)
