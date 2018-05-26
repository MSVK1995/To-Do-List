import React, { Component } from 'react';


class Cockpit extends Component {

    state = {
        inputVal: '',
    };

    //text changes in input field is given to inputVal for list display in App.js
    changeInputHandler = (event) => {
        this.setState({ inputVal: event.target.value });
    };

    //When user clicks on ADD button.
    addTaskHandler = () => {
        this.props.addtask(this.state.inputVal);
        this.setState({ inputVal: '' })
    }

    //When user presses 'Enter' key from text input.
    keyPressHandler = (target) => {
        if (target.charCode === 13) {
            this.props.addtask(this.state.inputVal);
            this.setState({ inputVal: '' });
        }
    }

    deleteAllHandler = () => {
        this.props.deleteAll();
    }

    render() {
        return (
            <div>
                <input 
                    className="form-control" 
                    type="text" value={this.state.inputVal} 
                    placeholder="Add task" 
                    onChange={(event) => this.changeInputHandler(event)} 
                    onKeyPress={(event)=>this.keyPressHandler(event)}/>
                <br />
                <center>
                    <button className="btn btn-primary" onClick={this.addTaskHandler}> ADD </button>
                    <button className="btn btn-danger" style = {{marginLeft: '10px'}} onClick={this.deleteAllHandler}> DELETE ALL </button>
                </center>
            </div>
        );
    }
}

export default Cockpit;