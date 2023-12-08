import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationLink.css'

const NavigationLink = (props) => {
  return (
    <Link to={props.location} className='navLink'>
        <h1 onClick={props.onClick}>{props.text}</h1>
    </Link>
  )
}

export default NavigationLink