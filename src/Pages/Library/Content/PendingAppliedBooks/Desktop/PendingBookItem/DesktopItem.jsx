import React, {useState} from 'react'
import AppliedBookModal from '../../../../../../components/Modals/AppliedBookModal/AppliedBookModal'
import './DesktopItem.css'

const DesktopItem = ({book}) => {
    var imgsrc = book.elements[6].elements[0].text
    const [modalOpened, setModalOpened] = useState(false)
    return (
      <div className='pending-applied-item-container'>
          <div className='pending-applied-item-content-container' onClick={() => setModalOpened(true)}>
             <div className='pending-applied-item-data-container'>
                <img src={imgsrc} className='pending-applied-item-image-container'/>
                <h1>{book.elements[1].elements[0].text}</h1> 
             </div>
          </div>
          <AppliedBookModal show={modalOpened} onHide={() => setModalOpened(false)} book={book}/>
      </div>
    )
}

export default DesktopItem