import React, { useEffect, useState } from 'react'
import './OverdueBooks.css'
import DesktopOverdueBooks from './DesktopOverdueBooks/DesktopOverdueBooks'
import MobileOverdueBooks from './MobileOverdueBooks/MobileOverdueBooks'

const OverdueBooks = () => {

  return (
    <div className="overdue-books">
        <div className="desktop-overdue-books">
            <DesktopOverdueBooks />
        </div>
        <div className='mobile-overdue-books'>
            <MobileOverdueBooks />
        </div>
    </div>
  )
}

export default OverdueBooks