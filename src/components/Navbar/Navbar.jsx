import React, { useState } from 'react'
import './Navbar.css'
import Logo from './NavbarComponents/Logo/Logo'
import NavigationLink from './NavbarComponents/NavigationLink/NavigationLink'
import SignUpNavLink from './NavbarComponents/SignUpLink/SignUpNavLink'
import LoginModal from '../Modals/Login/LoginModal'

export const Navbar = () => {
  const [modalLoginOpen, setModalLoginOpen] = useState(false);

  return (
    <div className='navbarContainer'>
      <Logo />
      <NavigationLink location = '/' text = 'Home'/>
      <NavigationLink text = 'About' onClick={() => window.scrollTo({top: 950, behavior: 'smooth'})}/>
      <NavigationLink text = 'Login' onClick={() => setModalLoginOpen(true)}/>
      <LoginModal show={modalLoginOpen} onHide={() => setModalLoginOpen(false)}/>
      <SignUpNavLink />
    </div>
  )
}
