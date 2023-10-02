import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { createContext } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_API
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.withCredentials = true

export const Context = createContext({isAuthenticated : false}) //default value of context.but we can not change it if we pass it directly as we dont have any setter/changing function . So we create an component called Appwrapper and create a state of isAuthenticated so that we can access and also change value every where.

const AppWrapper = () => {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const[loading,setLoading] = useState(false)
  const[user,setUser] = useState({})
return(
  <Context.Provider value={{isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}}>
    <App />
  </Context.Provider>
)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
    <Toaster position="top-center" />
  </React.StrictMode>,
)
