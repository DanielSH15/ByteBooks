import React, {useState} from 'react'
import './SelectInput.css'

const SelectInput = (props) => {
  const [focused, setFocused] = useState(false)
  const [displayMessage, setDisplayMessage] = useState("")


  const handleFocus = (e) => {
    setFocused(true)
    if(e.target.value === props.hiddenoption){
      setDisplayMessage(props.errorMessage)
    } else {
      setDisplayMessage("")
    }
  }

    return (
      <div className='wrapperSelect'>
         <div className='inputDataSelect'>
            <select onChange={props.onChange} defaultValue={props.defaultValue} onBlur = {handleFocus} focused={focused.toString()} id={props.id}>
            <option hidden>{props.hiddenoption}</option>
              {props.options.map((option, i) => {
                  if(option === props.defaultValue){
                    return <option key={i} selected>{option}</option> 
                  } else {
                    return <option key={i}>{option}</option> 
                  }
              })}
            </select>
         </div>
         <span className='errorS'>{props.touched && props.error ? props.error : ''}</span>
      </div>
    )
}

export default SelectInput