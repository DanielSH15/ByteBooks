import React, { useState } from 'react'
import './Input.css'

const Input = (props) => {
  const [displayMessage, setDisplayMessage] = useState(false)
  const [focused, setFocused] = useState("")
  var data = document.getElementById(props.id)

  const handleFocus = (e) => {
    setFocused(true)
    if(props.regex != null){
      if(props.regex.test(data.value) === false){
        setDisplayMessage(props.errorMessage)
      } else {
        setDisplayMessage("")
    }
    }
  }
  
  return (
    <div className='wrapper'>
       <div className='inputData'>
          <input type={props.type} onChange={props.onChange} defaultValue={props.defaultValue} id={props.id} onBlur = {handleFocus} focused={focused.toString()} required/>
          <label>{props.label}</label>
       </div>
       <span className='errorS'>{displayMessage}</span>
    </div>
  )
}

export default Input