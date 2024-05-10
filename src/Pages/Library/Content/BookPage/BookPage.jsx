import React from 'react'
import { useLocation } from 'react-router-dom';
import './BookPage.css'
import DesktopBookPage from './DesktopBookPage/DesktopBookPage';
import MobileBookPage from './MobileBookPage/MobileBookPage';

const BookPage = () => {
  const location = useLocation()
  var {book} = location.state.book

  return (
    <div className='book-page-wrapper-container'>
      <div className='desktop-book-page-container'>
        <DesktopBookPage book={book}/>
      </div>
      <div className='mobile-book-page-container'>
        <MobileBookPage book={book}/>
      </div>
    </div>
  )
}

export default BookPage