import { useContext } from "react"
import "../styles/Header.scss"
import { Link } from "react-router-dom"
import { Context } from "../main"
import axios from "axios"
import toast from "react-hot-toast"
function Header() {

  const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser } = useContext(Context)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get("/users/logout")
      toast.success(data.message)
      setIsAuthenticated(false)
      setUser({})
      setLoading(false)
    } 
    catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(true)
      setLoading(false)
    }
  }


  return (
    <div className="header">
      <h2 className="left">Todo App</h2>
      <div className="right">
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated ? <button disabled={loading} className="header-btn" onClick={logoutHandler}>Logout</button> : <Link className="header-btn" to={"/login"}>Login</Link>
        }
      </div>
    </div>
  )
}

export default Header
