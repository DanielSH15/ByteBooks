import React, {useContext, useEffect, useState} from 'react'
import BorrowedBookInfo from '../../../../components/Modals/BorrowedBook/BorrowedBookInfo'
import './NormalCartItem.css'
import { Context } from '../../../../components/Contexts/AuthContext/AuthContext'
import axios from 'axios'

const NormalCartItem = ({book}) => {
    var imgsrc = book.photoFileName
    const[returnDate, setReturnDate] = useState('')
    const [modalOpened, setModalOpened] = useState(false)
    const {user} = useContext(Context)

    const params = {
      userId: user.userId,
      bookId: book.bookId
    }

  const getReturnDate = async() => {
    try{
      var response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/borrowedbooks', {params})
      setReturnDate(response.data)
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    getReturnDate()
    console.log(returnDate)
  }, [])
  return (
    <span>
       <div className='cart-item-container'>
        <div className='cart-item-content-container' onClick={() => setModalOpened(true)}>
           <div className='cart-item-data-container'>
            <img src={imgsrc} className='cart-item-image-container'/>
            <div className='cart-item-title-container'>
              <h1>{book.name}</h1> 
              <h3>Your return date: {returnDate}</h3>
            </div>
           </div>
        </div>
        <BorrowedBookInfo show={modalOpened} onHide = {() => setModalOpened(false)} book = {book}/>
    </div>
    </span>
  )
}

export default NormalCartItem