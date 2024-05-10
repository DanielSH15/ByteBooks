import React from 'react'
import Logo from '../../NavbarComponents/Logo/Logo'
import Bell from '../../NavbarComponents/Bell/Bell'
import { HiSearch } from 'react-icons/hi'
import './UpperNavigation.css'

const UpperNavigation = () => {
  return (
    <div className='mobile-upper-navigation'>
        <div className='mobile-upper-logo'>
            <Logo />
        </div>
        <div className='mobile-upper-nav-content'>
            <Bell />
            <div className='mobile-upper-nav-search'>
              <HiSearch />
            </div>
        </div>
    </div>
  )
}

export default UpperNavigation