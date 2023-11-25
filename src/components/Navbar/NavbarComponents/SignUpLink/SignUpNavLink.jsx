import React from 'react'
import { Link } from 'react-router-dom'
import './SignUpNavLink.css'

const SignUpNavLink = () => {
  return (
    <Link className='signUpNavLink' to='/registration'>
        <h1>Registration</h1>
    </Link>
  )
}

export default SignUpNavLink