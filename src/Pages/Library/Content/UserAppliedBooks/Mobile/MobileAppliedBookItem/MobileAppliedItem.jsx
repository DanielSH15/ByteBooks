import React, {useState} from 'react'
import EditAppliedBookModal from '../../../../../../components/Modals/EditAppliedBook/EditAppliedBookModal'
import DeleteConfirmationModal from '../../../../../../components/Modals/DeleteConfirmation/DeleteConfirmationModal'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import './MobileAppliedItem.css'

const MobileAppliedItem = ({book}) => {
    var imgsrc = book.elements[6].elements[0].text
    const [modalOpened, setModalOpened] = useState(false)
    const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const id = book.elements[0].elements[0].text


  const HandleClickDelete = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Delete xmlns="http://tempuri.org/">'
          +'<id>' + id + '</id>'
        + '</Delete>'
      + '</Body>'
    + '</Envelope>'     
    
    xmlhttp.onreadystatechange = () => {
      if(xmlhttp.readyState === 4){
          if(xmlhttp.status === 200){
            console.log(xmlhttp.responseText)
          }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    window.location.reload(false)
  }

  return (
    <div className='applied-book-mobile-item'>
            <div className='applied-book-mobile-item-content'>
                <div className='applied-book-mobile-item-data'>
                    <img src={imgsrc} className='mobile-applied-item-image-container'/>
                    <h1>{book.elements[1].elements[0].text}</h1>
                </div>
                <div className='applied-book-mobile-actions'>
                    <FaPencilAlt className='applied-book-mobile-action-pencil' onClick={() => setModalOpened(true)}/>
                    <FaTrash className='applied-book-mobile-action-trash' onClick={() => setDeleteModalOpened(true)}/>
                </div>
            </div>
            <EditAppliedBookModal show={modalOpened} onHide={() => setModalOpened(false)} book={book}/>
            <DeleteConfirmationModal show={deleteModalOpened} onHide={() => setDeleteModalOpened(false)} onDelete={HandleClickDelete}/>
    </div>
  )
}

export default MobileAppliedItem