import React, { useEffect, useState } from 'react'
import './Input.css'

const Input = (props) => {
  var data = document.getElementById(props.id)

  return (
    <div className='wrapper'>
       <div className='inputData'>
          <input type={props.type} onChange={props.onChange} defaultValue={props.defaultValue} id={props.id} onBlur = {props.handleBlur} required/>
          <label>{props.label}</label>
       </div>
       <span className='errorS'>{props.touched && props.error ? props.error : ''}</span>
    </div>
  )
}

export default Input