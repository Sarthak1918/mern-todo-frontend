import '../styles/Task.scss'
// eslint-disable-next-line react/prop-types
function Task({title,description,isCompleted,updateHandle,deleteHandle,id}) {
    return (
        <div className="task-div">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="right">
                <input onChange={()=>updateHandle(id)} id="check-box" type="checkbox" checked={isCompleted} name="isCompleted" />
                <button onClick={()=>deleteHandle(id)} id="del-btn">Delete</button>
            </div>
        </div>
    )
}

export default Task
