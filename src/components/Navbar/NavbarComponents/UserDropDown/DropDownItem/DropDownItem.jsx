import React from 'react'
import './DropDownItem.css'
import { Link } from 'react-router-dom'

const DropDownItem = (props) => {
  return (
    <li className='dropdownitem'>
           <div>{props.icon}</div>
           <Link to={props.location} onClick = {props.do} className='itemTitle'>{props.text}</Link>
    </li>
  )
}

export default DropDownItem