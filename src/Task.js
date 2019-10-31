import React, {useState} from "react";

const Task = ({task, stop, start, descript, status, id, save, update, registered}) => {
  const defaultDate = new Date().toLocaleDateString();
  const [taskName, setTaskNameHandler] = useState("Default Name.");
  const [taskDescript, setTaskDescriptHandler] = useState("Default Descript.");
  const [deadline, setDeadlineHandler] = useState(defaultDate);
  const [startDate, setStartDateHandler] = useState(defaultDate);
  const [taskStatus, setTaskStatusHandler] = useState(status !== "" ? status : false);
  const wasCreated = () => {
    if(!registered) {
      return save(taskName, deadline, startDate, taskDescript, taskStatus, id === "" ? 0 : id)
    } else {
      return update(taskName, deadline, startDate, taskDescript, taskStatus, id)
    }
  }
  return (
    <div className="task__card">
      <label>
        Task Name
        <input type="text" onChange={e => setTaskNameHandler(e.target.value)} id="taskName" value={task !== "" ? task : taskName} />
      </label>

      <label>
        Task description
        <input type="text" onChange={e => setTaskDescriptHandler(e.target.value)} id="taskDescript" value={descript !== "" ? descript : taskDescript} />
      </label>

      <label>
        Started
        <input type="date" onChange={e => setStartDateHandler(e.target.value)} id="startDate" value={start !== "" ? start : startDate} />
      </label>

      <label>
        Deadline
        <input type="date" onChange={e => setDeadlineHandler(e.target.value)} id="deadline" value={stop !== "" ? stop : deadline} />
      </label>

      <label>
        {taskStatus ? "Task is completed" : "Task is incompleted"}
        <input type="checkbox" onChange={() => setTaskStatusHandler(!taskStatus)} id="taskStatus" value={taskStatus} checked={taskStatus}/>
      </label>

      <button onClick={() => wasCreated()}>{!registered ? "Save Task" : "Update Task"}</button>
    </div>
  )
};

export default Task;

Task.defaultProps = {
  task: "",
  stop: "",
  start: "",
  descript: "",
  status: "",
  id: 0,
  registered: false
}