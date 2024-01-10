import React from 'react'
import './MenuItem.css'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {

  const SetContent = (e, page) => {
    e.preventDefault()
    props.changeContent(page)
  }

  return (
    <div>
       <Link key={props.index} className='menu-item-container' onClick={props.do} to={props.path}>
        <div className="item-icon">{props.icon}</div>
        <div style={{display: props.isOpen ? "block" : "none"}}  className='item-text'>{props.name}</div>
       </Link>
    </div>
  )
}

export default MenuItem