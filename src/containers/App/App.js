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
        this.setState({todolist:[{content: val, strike: '', hover: false}] }, () =>{console.log(this.state.todolist);})
    }
    else {
      const taskList = [...this.state.todolist];
      let task = false;
      task = taskList.map(o => o.content === val).reduce(((val, nxt) =>{return(val || nxt)}), false);
      console.log(task);
      if (val !== '' && task===false) {
        taskList.push({ content: val, strike: '', hover: false });
        this.setState({
          todolist: taskList
        }, () =>{console.log(this.state.todolist);});
      }
      else{
        alert("Task already exists");
        task = false;
      }
    }
    // if (this.state.todolist[0].content === '')
    //   this.state.todolist.splice(0, 1);
    //console.log(this.state.todolist);
  }



  removeTaskHandler = (index) => {
    let getList = [...this.state.todolist];
    getList.splice(index, 1);
    //console.log(getList, index, getList[index]);
    this.setState({ todolist: getList}, () => {
      console.log(this.state.todolist);});
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
    if(this.state.todolist === null || this.state.todolist.length === 0){
      alert('The list is empty');
    }
    else{
      if (window.confirm("Are you sure you want to delete all tasks? ( " + (this.state.todolist.length) + " selected ).")) {
        this.setState({
          todolist: []
        });
      }
    }
  }
  handleHoverOptions = (event,index) => {
    event.stopPropagation();
    let getList = [...this.state.todolist];
    if(event.type === 'mouseenter')
    {
      getList[index].hover = true;
    }
    else
    getList[index].hover = false;
    this.setState({
      todolist: getList
    });
    //console.log(this.state.todolist);
  }


  render() {
    let display = (this.state.todolist === null ? null : this.state.todolist.map((taskEle, index) => {
      return <li
        className="list-group-item"
        key={index}
        //onClick={() => this.removeTaskHandler(index)}
        //title="Delete Task"
        onMouseEnter={(event) => this.handleHoverOptions(event, index)}
        onMouseLeave={(event) => this.handleHoverOptions(event,index)}
        >
        <strong
          style={{ cursor: "pointer" }}>
          {index + 1 + ' . '}
        </strong>
        <span
          onClick={(event) => this.completedTaskHandler(event, index)}
          style={{ textDecoration: taskEle.strike, cursor: 'pointer', backgroundColor: taskEle.strike ? 'green' : 'white', color: taskEle.strike ? 'white' : 'black' }}
          title={taskEle.strike === '' ? "Mark Complete": "Mark Incomplete"}>
          {' ' + taskEle.content}
        </span>
        <div className='options'>
          <span title={taskEle.strike === '' ? "Mark Complete": "Mark Incomplete"}>{this.state.todolist[index].hover && <span onClick={(event) => this.completedTaskHandler(event, index)}>Complete</span>}</span>
          <span title='Delete Task'>{this.state.todolist[index].hover? <span onClick={() => this.removeTaskHandler(index)} style = {{paddingLeft: '20px', cursor: 'pointer'}}>Delete</span>:null}</span>
        </div> 
        {/* <span style = {{marginRight: '3px'}}>{this.state.todolist[index].hover && <span onClick = {(event)=>this.removeTaskHandler(event, index + 1)}>Hello</span>}</span> */}
      </li>
    }));



    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}> To-Do List </h1>
        <Cockpit
          addtask={(val) => this.addToListHandler(val)}
          deleteAll={this.deleteAllTasksHandler} />
        <hr />
        <div>
          <ol className="list-group">
            {display}
          </ol>
        </div>
      </div>
    )
  }
}

export default App;
