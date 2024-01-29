import React, { useState, useEffect } from "react";
import './StopWatch.css'


const StopWatch = (props) => {
    const time = props.time
    const setTime = (time) => {
      props.setTime(time)
    }

  useEffect(() => {
    let intervalId;
    if (props.isRunning) {
      // setting time from 0 to 1 every 10 miliseconds using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [props.isRunning, time]);


  const hours = Math.floor(time / 360000);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);


  const startAndStop = () => {
    props.setIsRunning(!props.isRunning);
    if(props.isRunning === true){
        console.log(time)
    }
  };

  const reset = () => {
    setTime(0);
  };
  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {props.isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button-reset" onClick={reset} style={{display: props.isRunning ? 'none' : 'block'}}>
          Reset
        </button>
        <button className="submit-time-button" style={{display: time !== 0 && !props.isRunning ? 'block' : 'none'}} onClick={props.setBorrowTime}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default StopWatch