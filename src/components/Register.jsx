import { Link, Navigate } from "react-router-dom"
import "../styles/Login.scss"
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main";


function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated,setIsAuthenticated,loading,setLoading,setUser}=useContext(Context)



  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post("/users/register",
        {
          name, email, password
        }
      )
      toast.success(data.message)
      setIsAuthenticated(true)
      setUser(data.user)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }

  }

  if(isAuthenticated) return <Navigate to={"/"}/> //we can't call any component inside a function so we are checking outside here.

  return (
    <div className="container">
      <div className="form-container">
        <h1>Signup</h1>
        <form onSubmit={submitHandler}>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Enter name" required/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter email" required/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Enter password" required/>
          <button disabled={loading} id="login-btn" type="submit">Sign up</button>
        </form>
        <div>
          <p id="already-text">Already a user?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
