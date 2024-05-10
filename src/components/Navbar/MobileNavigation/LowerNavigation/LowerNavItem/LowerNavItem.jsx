import React from 'react'
import './LowerNavItem.css'
import { Link } from 'react-router-dom'

const LowerNavItem = (props) => {
  return (
    <div className='lower-nav-item-wrapper' key={props.i} onClick={props.action}>
      <Link to={props.path} style={{textDecoration: 'none'}}>
        <div className='lower-nav-item-content'>
              <div className='lower-nav-item-icon'>{props.icon}</div>
              <span className='lower-nav-item-title'>{props.title}</span>
          </div>
      </Link>
    </div>
  )
}

export default LowerNavItem