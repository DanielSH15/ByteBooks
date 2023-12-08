import React from 'react'
import './Input.css'

const Input = (props) => {
  return (
    <div className='wrapper'>
       <div className='inputData'>
          <input type={props.type} onChange={props.onChange} required/>
          <label>{props.label}</label>
       </div>
    </div>
  )
}

export default Input