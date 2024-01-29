import React, {useState} from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import './AppliedBookItem.css'
import EditAppliedBookModal from '../../../../../components/Modals/EditAppliedBook/EditAppliedBookModal'
import DeleteConfirmationModal from '../../../../../components/Modals/DeleteConfirmation/DeleteConfirmationModal'

const AppliedBookItem = ({book}) => {
  var imgsrc = 'http://localhost:5226/Photos/' + book.elements[6].elements[0].text
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
    <div className='applied-item-container'>
        <div className='applied-item-content-container'>
           <div className='applied-item-data-container'>
              <img src={imgsrc} className='applied-item-image-container'/>
              <h1>{book.elements[1].elements[0].text}</h1> 
           </div>
           <div className='applied-item-actions-container'>
             <FaPencilAlt style={{color: '#FFF', marginRight: '25px', cursor: 'pointer'}} onClick={() => setModalOpened(true)}/>
             <FaTrash style={{color: '#FF0000', cursor: 'pointer'}} onClick={() => setDeleteModalOpened(true)}/>
           </div>
        </div>
        <EditAppliedBookModal show={modalOpened} onHide={() => setModalOpened(false)} book={book}/>
        <DeleteConfirmationModal show={deleteModalOpened} onHide={() => setDeleteModalOpened(false)} onDelete={HandleClickDelete}/>
    </div>
  )
}

export default AppliedBookItem