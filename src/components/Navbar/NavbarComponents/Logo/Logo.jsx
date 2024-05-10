import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <div className='logo-contents-container'>
      <Link to='/' className='logoTitle'>
        <div className='logoContainer'></div>
        <h1>ByteBooks</h1>
      </Link>
    </div>
  )
}

export default Logo