import React, { useState, useEffect } from 'react'
import './UserNavbar.css'
import UpperNavigation from './MobileNavigation/UpperNavigation/UpperNavigation'
import RegularNav from './RegularNavigation/RegularNav'
import LowerNavigation from './MobileNavigation/LowerNavigation/LowerNavigation'

const UserNavbar = () => {
  const [isPhone, setIsPhone] = useState(false)

  
  return (
    <div className='navigation-container'>
          <div className='mobile-navigation-container'>
            <UpperNavigation />
            <div className='lower-navigation-container'>
              <LowerNavigation />
            </div>
          </div>
          <div className='regular-navigation-container'>
            <RegularNav />
          </div>
    </div>
  )
}

export default UserNavbar