import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './SignUpNavLink.css'
import RegistrationModal from '../../../Modals/Registration/RegistrationModal'
import LoginModal from '../../../Modals/Login/LoginModal'

const SignUpNavLink = () => {
  const[registrationVisible, setRegistrationVisible] = useState(false)
  const[loginModalVisible, setLoginModalVisible] = useState(false)
  return (
    <Link className='signUpNavLink'>
        <h1 onClick={() => setRegistrationVisible(true)}>Registration</h1>
        <RegistrationModal show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>
    </Link>
  )
}

export default SignUpNavLink