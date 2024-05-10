import React, { useEffect, useState } from 'react'
import './ManageBooks.css'
import DesktopManagement from './DesktopBookManagement/DesktopManagement'
import MobileManagement from './MobileBookManagement/MobileManagement'

const ManageBooks = () => {
  return (
    <div className="books-management-container">
        <div className="desktop-management">
            <DesktopManagement />
        </div>
        <div className='mobile-management'>
            <MobileManagement />
        </div>
    </div>
  )
}

export default ManageBooks