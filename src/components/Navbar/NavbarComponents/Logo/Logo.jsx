import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to='/' className='logoTitle'>
      <div className='logoContainer'></div>
      <h1>ByteBooks</h1>
    </Link>
  )
}

export default Logo