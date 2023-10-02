import { useContext } from "react"
import { Context } from "../main"
import Loader from "./Loader"

function Profile() {
  const{user,loading} = useContext(Context)


  return(
   loading ? (<Loader/>) :(<div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>)
  )
  
}

export default Profile
