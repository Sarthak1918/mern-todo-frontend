import { useContext, useEffect, useState } from "react"
import "../styles/Home.scss"
import Task from "./Task"
import axios from "axios"
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { Context } from "../main"

function Home() {
  const[title,setTitle] = useState("")
  const[description,setDescription] = useState("")
  const[loading,setLoading] = useState(false)
  const[refresh,setRefresh] = useState(false)
  const [tasks, setTasks] = useState([])

  const{isAuthenticated} = useContext(Context)

  const submitHandle = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post("/task/new",{
        title,description
      })

      setTitle("")
      setDescription("")
      toast.success(data.message)
      setRefresh(prev=>!prev)
      setLoading(false)

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      setLoading(false)
    }
   
  }

  const updateHandle= async(id) =>{
    try {
      const {data} = await axios.put(`/task/update/${id}`)
      toast.success(data.message)
      setRefresh(prev=>!prev)
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  const deleteHandle= async(id) =>{
    try {
      const {data} = await axios.delete(`/task/delete/${id}`)
      toast.success(data.message)
      setRefresh(prev=>!prev)
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    axios.get("/task/my")
    .then((res)=>setTasks(res.data.tasks))
    .catch((err)=>toast.error(err.response.data.message))
  },[refresh])


  if(!isAuthenticated) return <Navigate to={"/login"}/>
  
  


  return (
    <div className="home-container">
      <div className="form-div">
        <form onSubmit={submitHandle}>
          <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" name="title" placeholder="Task Title" />
          <input onChange={(e)=>setDescription(e.target.value)} value={description} type="text" name="description" placeholder="Task Description" />
          <button disabled={loading} id="add-btn" type="submit">Add Task</button>
        </form>
      </div>

      <div style={{"margin-top": "50px"}}>
        {
          tasks.map((task) => {
            return <Task key={task._id} title={task.title} description={task.description} isCompleted ={task.isCompleted} id={task._id} updateHandle={updateHandle} deleteHandle={deleteHandle}/>
          })
        }
      </div>
      </div>
  )
}

export default Home
