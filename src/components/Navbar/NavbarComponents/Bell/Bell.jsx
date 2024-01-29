import React, { useState } from 'react'
import './Bell.css'
import Messages from './Messages/Messages'
import { FaBell } from 'react-icons/fa'

const Bell = () => {
  const[open, setOpen] = useState(false)
  return (
    <div className='bellIconContainer'>
      <FaBell className='bell-icon' onClick={() => setOpen(!open)}/>
      <Messages open={open} />
    </div>
  )
}

export default Bell