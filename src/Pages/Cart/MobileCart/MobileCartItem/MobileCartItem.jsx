import React, {useState} from 'react'
import './MobileCartItem.css'
import BorrowedBookInfo from '../../../../components/Modals/BorrowedBook/BorrowedBookInfo'

const MobileCartItem = ({book}) => {
    const imgsrc = book.photoFileName
    const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className='mobile-cart-item-wrapper'>
        <div className='mobile-cart-item-contents'>
            <div className="mobile-cart-item-image" onClick={() => setModalOpened(true)}>
                <img src={imgsrc}/>
            </div>
            <div className="mobile-cart-item-title">
                <span>{book.name}</span>
            </div>
        </div>
        <BorrowedBookInfo show={modalOpened} onHide = {() => setModalOpened(false)} book = {book}/>
    </div>
  )
}

export default MobileCartItem