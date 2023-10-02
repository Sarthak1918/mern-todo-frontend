import {useContext} from 'react'
import Header from './components/Header'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Home from './components/Home'
import './styles/app.scss'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Context } from './main'
import axios from 'axios'
import { useEffectOnce } from 'react-unique-hooks'

function App() {
  const{setUser,setIsAuthenticated,setLoading} = useContext(Context)
  
  useEffectOnce(()=>{
    setLoading(true)
    axios.get("/users/me")
    .then((response)=>{
      setUser(response.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    })
    .catch(()=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  })


  return (
    <Router>
        <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App
