import React, { useState } from 'react'
import './LoginInput.css'

const LoginInput = (props) => {


  return (
    <div className='wrapper-login'>
       <div className='inputData-login'>
          <input type={props.type} onChange={props.onChange} required/>
          <label>{props.label}</label>
       </div>
    </div>
  )
}

export default LoginInput