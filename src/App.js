import React, {Component} from 'react';
import Task from "./Task";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      dashboard: []
    }
    this.createTask=this.createTask.bind(this);
    this.showAllTasks=this.showAllTasks.bind(this);
    this.showStatusTasks=this.showStatusTasks.bind(this);
    this.clearDashboard=this.clearDashboard.bind(this);
    this.saveTask=this.saveTask.bind(this);
  }

  componentDidMount() {
    const taskStored = JSON.parse(localStorage.getItem("TaskStorage"));
    if (taskStored) {
      const taskDataStored = taskStored.map((task) => {
        console.log(task);
        const dataObject = {
          task: task.task,
          stop: task.stop,
          start: task.start,
          descript: task.descript,
          status: task.status
        }
        return dataObject;
      });
      this.setState({
        tasks: taskDataStored
      });
    }
  }
  
  createTask() {
    this.setState({
      dashboard: <Task save={this.saveTask}></Task>
    })
  }

  showAllTasks() {
    const allTasks = this.state.tasks.map((task) => {
      return <Task task={task.task} stop={task.stop} start={task.start} descript={task.descript} save={this.saveTask} key={task.key} status={task.status}></Task>
    });
    this.setState({
      dashboard: allTasks
    })
  }

  showStatusTasks(statuscheckbox) {
    const statusTasks = this.state.tasks.map((task) => {
      if(task.status === statuscheckbox) {
        return <Task task={task.task} stop={task.stop} start={task.start} descript={task.descript} save={this.saveTask} key={task.key} status={task.status}/>
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

  saveTask(taskName, deadline, startDate, taskDescript, taskStatus) {
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
        status: taskStatus
      }
      const prevData = this.state.tasks;
      prevData.push(savedData);
      this.setState({
        tasks: prevData
      }, () => {
        localStorage.setItem("TaskStorage", JSON.stringify(this.state.tasks))
      })
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
