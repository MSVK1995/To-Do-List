import React from 'react';

const cockpit = (props) => {
    var inpVal;
    var inpEvent;

    //text changes in input field is given to inputVal for list display in App.js
    let changeInputHandler = (event) => {
        inpVal = '';
        inpVal = inpVal + event.target.value;
        inpEvent = event.target;
    };

    //When user clicks on ADD button.
    let addTaskHandler = () => {
        props.addtask(inpVal);
        inpEvent.value = '';
    }

    //When user presses 'Enter' key from text input.
    let keyPressHandler = (target) => {
        if (target.charCode === 13) {
            props.addtask(inpVal);
            inpEvent.value = '';
        }
    }

    let deleteAllHandler = () => {
        props.deleteAll();
    }
    return (
        <div>
            <input
                className="form-control"
                type="text"
                value={inpVal}
                placeholder="Add task"
                onChange={(event) => changeInputHandler(event)}
                onKeyPress={(event) => keyPressHandler(event)} />
            <br />
            <center>
                <button className="btn btn-primary" onClick={addTaskHandler}> ADD </button>
                <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={deleteAllHandler}> DELETE ALL </button>
            </center>
        </div>
    );
}

export default cockpit;