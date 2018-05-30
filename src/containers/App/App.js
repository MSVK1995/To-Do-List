import React, { Component } from 'react';
import './App.css';
import Cockpit from '../../components/cockpit/Cockpit';

class App extends Component {

  state = {
    todolist: null
  };
  addToListHandler = (val) => {
    if (this.state.todolist === null) {
      if (val !== '')
        this.setState({todolist:[{content: val, strike: '', hover: false}] })
    }
    else {
      const taskList = [...this.state.todolist];
      if (val !== '') {
        taskList.push({ content: val, strike: '', hover: false });
        this.setState({
          todolist: taskList
        });
      }

    }
    // if (this.state.todolist[0].content === '')
    //   this.state.todolist.splice(0, 1);
    //console.log(this.state.todolist);
  }

  removeTaskHandler = (index) => {
    let getList = [...this.state.todolist];
    getList.pop(index);
    this.setState({ todolist: getList });
    //console.log(this.state.todolist)
  }

  completedTaskHandler = (event, index) => {
    event.stopPropagation();
    let completedTaskArray = [...this.state.todolist];
    completedTaskArray[index-1].strike = (completedTaskArray[index-1].strike === '') ? 'line-through' : '';
    this.setState({
      todolist: completedTaskArray
    });
  }

  deleteAllTasksHandler = () => {
    if (window.confirm("Are you sure you want to delete all tasks? ( " + (this.state.todolist.length - 1) + " selected ).")) {
      this.setState({
        todolist: []
      });
    }
  }
  handleHoverOptions = (index) => {
    let getList = [...this.state.todolist];
    getList[index].hover = !(getList[index].hover);
    this.setState({
      todolist: getList
    });
    //console.log(getList[index].hover);
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
            {this.state.todolist === null ? null : this.state.todolist.map((taskEle, index) => {
              return <li
                className="list-group-item"
                key={index}
                onClick={() => this.removeTaskHandler(index)}
                title="Delete Task"
                onMouseEnter={() => this.handleHoverOptions(index)}
                onMouseLeave={() => this.handleHoverOptions(index)}>
                <strong
                  style={{ cursor: "pointer" }}>
                  {index + 1 + ' . '}
                </strong>
                <span
                  onClick={(event) => this.completedTaskHandler(event, index + 1)}
                  style={{ textDecoration: taskEle.strike, cursor: 'pointer', backgroundColor: taskEle.strike ? 'green' : 'white', color: taskEle.strike ? 'white' : 'black' }}
                  title="Complete Task">
                  {' ' + taskEle.content}
                </span>
                <div className='options'>
                  <span title='Complete Task'>{this.state.todolist[index].hover && <a onClick={(event) => this.completedTaskHandler(event, index + 1)}>Complete</a>}</span>
                  <span title='Delete Task'>{this.state.todolist[index].hover && <a onClick={(event) => this.removeTaskHandler(event, index + 1)}> Delete</a>}</span>
                </div>
                {/* <span style = {{marginRight: '3px'}}>{this.state.todolist[index].hover && <span onClick = {(event)=>this.removeTaskHandler(event, index + 1)}>Hello</span>}</span> */}
              </li>
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default App;
