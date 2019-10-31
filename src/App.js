import React, {Component} from 'react';
import Task from "./Task";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      dashboard: [],
      defaultId: ""
    }
    this.createTask=this.createTask.bind(this);
    this.showAllTasks=this.showAllTasks.bind(this);
    this.showStatusTasks=this.showStatusTasks.bind(this);
    this.clearDashboard=this.clearDashboard.bind(this);
    this.saveTask=this.saveTask.bind(this);
    this.updateTask=this.updateTask.bind(this);
  }

  componentDidMount() {
    const taskStored = JSON.parse(localStorage.getItem("TaskStorage"));
    if (taskStored) {
      const taskDataStored = taskStored.map((task) => {
        const dataObject = {
          task: task.task,
          stop: task.stop,
          start: task.start,
          descript: task.descript,
          status: task.status,
          id: task.id,
          registered: task.registered
        }
        return dataObject;
      });
      this.setState({
        tasks: taskDataStored
      }, () => {
        this.setState({
          defaultId: this.state.tasks.length
        }, () => {console.log(this.state)})
      });
    }
  }
  
  createTask() {
    this.setState({
      dashboard: <Task save={this.saveTask} id={this.state.defaultId} update={this.updateTask}></Task>
    })
  }

  showAllTasks() {
    const allTasks = this.state.tasks.map((task) => {
      return <Task task={task.task} stop={task.stop} start={task.start} descript={task.descript} save={this.saveTask} update={this.updateTask} key={task.key} status={task.status} id={task.id} registered={true}></Task>
    });
    this.setState({
      dashboard: allTasks
    })
  }

  showStatusTasks(statuscheckbox) {
    const statusTasks = this.state.tasks.map((task) => {
      if(task.status === statuscheckbox) {
        return <Task task={task.task} stop={task.stop} start={task.start} descript={task.descript} save={this.saveTask} update={this.updateTask} key={task.key} status={task.status} id={task.id} registered={true}/>
      }
    });
    this.setState({
      dashboard: statusTasks
    })
  }

  clearDashboard() {
    this.setState({
      dashboard: ""
    })
  }

  saveTask(taskName, deadline, startDate, taskDescript, taskStatus, id, registered) {
    this.setState({
      dashboard: ""
    }, () => {
      const savedData = {
        task: taskName,
        stop: deadline,
        start: startDate,
        descript: taskDescript,
        save: this.saveTask,
        key: `${taskName}-${startDate}`,
        status: taskStatus,
        id: id,
        resgistered: registered
      }
      const prevData = this.state.tasks;
      prevData.push(savedData);
      this.setState({
        tasks: prevData
      }, () => {
        this.setState({
          defaultId: this.state.tasks.length
        }, () => {
          localStorage.setItem("TaskStorage", JSON.stringify(this.state.tasks))
        })
      })
    })
  }

  updateTask(taskName, deadline, startDate, taskDescript, taskStatus, id, registered) {
    this.setState({
      dashboard: ""
    }, () => {
      const updatedData = {
        task: taskName,
        stop: deadline,
        start: startDate,
        descript: taskDescript,
        save: this.saveTask,
        key: `${taskName}-${startDate}`,
        status: taskStatus,
        id: id,
        registered: registered
      }

      this.state.tasks.splice(id, 1);

      this.state.tasks.push(updatedData);

      this.state.tasks.sort((a, b) => {return a.id - b.id})
      localStorage.setItem("TaskStorage", JSON.stringify(this.state.tasks))
    })
  }

  render() {
    return(
      <div className="app__layout">
        <div className="app__nav">
          <button onClick={this.createTask}>Create new task</button>
          <button onClick={this.showAllTasks}>All tasks</button>
          <button onClick={() => this.showStatusTasks(false)}>Pending tasks</button>
          <button onClick={() => this.showStatusTasks(true)}>Completed tasks</button>
          <button onClick={this.clearDashboard}>Clear dashboard</button>
        </div>
        <div className="app__dashboard">
          {this.state.dashboard}
        </div>
      </div>
    )
  }
}

export default App;
