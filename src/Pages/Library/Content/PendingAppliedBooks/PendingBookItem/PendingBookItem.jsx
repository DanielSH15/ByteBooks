import React, {useState} from 'react'
import AppliedBookModal from '../../../../../components/Modals/AppliedBookModal/AppliedBookModal'
import './PendingBookItem.css'

const PendingBookItem = ({book}) => {
    var imgsrc = 'http://localhost:5226/Photos/' + book.elements[7].elements[0].text
    const [modalOpened, setModalOpened] = useState(false)
    return (
      <div className='applied-item-container' style={{width: '100%', marginLeft: '0vh'}}>
          <div className='applied-item-content-container' onClick={() => setModalOpened(true)}>
             <div className='applied-item-data-container'>
                <img src={imgsrc} className='applied-item-image-container'/>
                <h1>{book.elements[1].elements[0].text}</h1> 
             </div>
          </div>
          <AppliedBookModal show={modalOpened} onHide={() => setModalOpened(false)} book={book}/>
      </div>
    )
}

export default PendingBookItem