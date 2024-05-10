import React, { useState, useEffect } from 'react'
import './Navbar.css'
import Logo from './NavbarComponents/Logo/Logo'
import NavigationLink from './NavbarComponents/NavigationLink/NavigationLink'
import SignUpNavLink from './NavbarComponents/SignUpLink/SignUpNavLink'
import LoginModal from '../Modals/Login/LoginModal'
import GuestNavbar from './GuestNavbar/GuestNavbar'
import GuestSideNavbar from './SideNavbar/GuestSideNavbar'

export const Navbar = () => { 

  return(
    <div className='navigation-bar-container'>
      <div className='guest-side-nav-bar'>
        <GuestSideNavbar />
      </div>
      <div className='guest-nav-bar'>
        <GuestNavbar />
      </div>
    </div>
  )
}
