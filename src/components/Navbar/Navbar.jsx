import React from 'react'
import './Navbar.css'
import Logo from './NavbarComponents/Logo/Logo'
import NavigationLink from './NavbarComponents/NavigationLink/NavigationLink'
import SignUpNavLink from './NavbarComponents/SignUpLink/SignUpNavLink'

export const Navbar = () => {
  return (
    <div className='navbarContainer'>
      <Logo />
      <NavigationLink location = '/' text = 'Home'/>
      <NavigationLink location = '/about' text = 'About'/>
      <NavigationLink location = '/login' text = 'Login'/>
      <SignUpNavLink />
    </div>
  )
}
