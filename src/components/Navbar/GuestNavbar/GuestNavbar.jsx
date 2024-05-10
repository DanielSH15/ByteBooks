import React, { useState } from 'react'
import './GuestNavbar.css'
import Logo from '../NavbarComponents/Logo/Logo'
import NavigationLink from '../NavbarComponents/NavigationLink/NavigationLink'
import SignUpNavLink from '../NavbarComponents/SignUpLink/SignUpNavLink'
import LoginModal from '../../Modals/Login/LoginModal'

const GuestNavbar = () => {
    const [modalLoginOpen, setModalLoginOpen] = useState(false);  //set the modal open state

    return (
      <div className='navbarContainer'>
        <Logo />
        <div className='navbar-links-container'>
          <NavigationLink text = 'About' onClick={() => window.scrollTo({top: 950, behavior: 'smooth'})}/>
          <NavigationLink text = 'Login' onClick={() => setModalLoginOpen(true)}/>
          <SignUpNavLink />
        </div>
        <LoginModal show={modalLoginOpen} onHide={() => setModalLoginOpen(false)}/>
      </div>
    )
}

export default GuestNavbar