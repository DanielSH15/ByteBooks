import React, {useState} from 'react'
import AppliedBookModal from '../../../../../../components/Modals/AppliedBookModal/AppliedBookModal'
import './MobileItem.css'


const MobileItem = ({book}) => {
    var imgsrc = book.elements[6].elements[0].text
    const [modalOpened, setModalOpened] = useState(false)


    return (
        <div className='pending-book-mobile-item'>
            <div className='pending-book-mobile-item-content' onClick={() => setModalOpened(true)}>
                <div className='pending-book-mobile-item-data'>
                    <img src={imgsrc} className='pending-applied-item-image-container'/>
                    <h1>{book.elements[1].elements[0].text}</h1>
                </div>
            </div>
            <AppliedBookModal show={modalOpened} onHide={() => setModalOpened(false)} book={book}/>
        </div>
    )
}

export default MobileItem