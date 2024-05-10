import React, {useState} from 'react'
import BorrowedBookInfo from '../../../../components/Modals/BorrowedBook/BorrowedBookInfo'
import './NormalCartItem.css'

const NormalCartItem = ({book}) => {
    var imgsrc = book.photoFileName
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <span>
       <div className='cart-item-container'>
        <div className='cart-item-content-container' onClick={() => setModalOpened(true)}>
           <div className='cart-item-data-container'>
            <img src={imgsrc} className='cart-item-image-container'/>
            <h1>{book.name}</h1> 
           </div>
        </div>
        <BorrowedBookInfo show={modalOpened} onHide = {() => setModalOpened(false)} book = {book}/>
    </div>
    </span>
  )
}

export default NormalCartItem