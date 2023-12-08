import React from 'react'
import './SelectInput.css'

const SelectInput = (props) => {
  return (
    <div className='wrapperSelect'>
       <div className='inputDataSelect'>
          <select onChange={props.onChange}>
          <option hidden>{props.hiddenoption}</option>
            {props.options.map(option => (
                <option>{option}</option>
            ))}
          </select>
       </div>
    </div>
  )
}

export default SelectInput