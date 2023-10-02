import { Link, Navigate } from "react-router-dom"
import "../styles/Login.scss"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../main";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated,setIsAuthenticated,loading,setLoading,setUser}=useContext(Context)

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post("/users/login",
        {
         email, password
        }
      )
      toast.success(data.message)
      setIsAuthenticated(true)
      setUser(data.user)
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      setLoading(false);
    }

  }

  if(isAuthenticated) return <Navigate to={"/"}/> 

  return (
    <div className="container">
      <div className="form-container">
        <h1>Login to continue</h1>
        <form onSubmit={submitHandler}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Enter password" required />
          <button disabled={loading} id="login-btn" type="submit">Login</button>
        </form>
        <div>
          <p id="already-text">New Here?</p>
          <Link to={"/register"}>Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
