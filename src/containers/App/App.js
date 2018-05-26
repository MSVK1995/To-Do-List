import React, { Component } from 'react';
import './App.css';
import Cockpit from '../cockpit/Cockpit';

class App extends Component {

  state = {
    todolist: [Object]
  };
  addToListHandler = (val) => {
    const taskList = [...this.state.todolist];
    if (val !== '') {
      taskList.push({ content: val, strike: '' });
      this.setState({
        todolist: taskList
      });
    }
    // if (this.state.todolist[0].content === '')
    //   this.state.todolist.splice(0, 1);
    // console.log(this.state.todolist);
  }

  removeTaskHandler = (index) => {
    let getList = [...this.state.todolist];
    getList.splice(index + 1, 1);
    this.setState({ todolist: getList });
  }

  completedTaskHandler = (event, index) => {
    event.stopPropagation();
    let completedTaskArray = [...this.state.todolist];
    completedTaskArray[index].strike = (completedTaskArray[index].strike === '') ? 'line-through' : '';
    this.setState({
      todolist: completedTaskArray
    });
  }

  deleteAllTasksHandler = () => {
    if (window.confirm("Are you sure you want to delete all tasks? ( " + (this.state.todolist.length - 1) + " ).")) {
      this.setState({
        todolist: []
      });
    }
  }


  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}> To-Do List </h1>
        <Cockpit
          addtask={(val) => this.addToListHandler(val)}
          deleteAll={this.deleteAllTasksHandler} />
        <hr />
        <div>
          <ol className="list-group">
            {this.state.todolist.slice(1).map((taskEle, index) => {
              return <li
                className="list-group-item"
                key={index}
                onClick={() => this.removeTaskHandler(index)}
                title="click to delete the task">
                <span>
                  <strong
                    style={{ cursor: "pointer" }}>
                    {index + 1 + ' '}
                  </strong>
                  <span
                    onClick={(event) => this.completedTaskHandler(event, index + 1)}
                    style={{ textDecoration: taskEle.strike, cursor: 'pointer', backgroundColor: taskEle.strike ? 'green' : 'white', color: taskEle.strike ? 'white' : 'black' }}
                    title="Select to mark/unmark task as completed">
                    {' ' + taskEle.content}
                  </span>
                </span>
              </li>
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
