import React from 'react'
import './PendingBooks.css'
import PendingBooksDesktop from './Desktop/PendingBooksDesktop';
import PendingBooksMobile from './Mobile/PendingBooksMobile';

const PendingBooks = () => {

  return (
    <div className='pending-books'>
      <div className='pending-books-desktop'>
        <PendingBooksDesktop />
      </div>
      <div className="pending-books-mobile">
        <PendingBooksMobile />
      </div>
    </div>
  )
}

export default PendingBooks