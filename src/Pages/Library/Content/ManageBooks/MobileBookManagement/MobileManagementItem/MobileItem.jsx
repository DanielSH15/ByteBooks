import React, {useState} from 'react'
import './MobileItem.css'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import EditBookModal from '../../../../../../components/Modals/EditBook/EditBookModal'
import DeleteConfirmationModal from '../../../../../../components/Modals/DeleteConfirmation/DeleteConfirmationModal'
import axios from 'axios'

const MobileItem = ({book, key}) => {
  var imgsrc = book.photoFileName
  const[editModal, setEditModal] = useState(false)
  const[deleteModal, setDeleteModal] = useState(false)


    const DeleteBook = async() => {
        try{
            await axios.delete('http://localhost:5226/api/book/' + book.bookId)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false)
            })
        } catch (e) {
            console.log(e.response.data)
        }
    }
  return (
    <div className='mobile-management-item'>
      <div className='mobile-item-content'>
        <div className='mobile-item-image-container'>
          <img src={imgsrc}/>
        </div>
        <div className='mobile-item-title-container'>
          <span>{book.name}</span>
          <hr />
        </div>
      </div>
      <div className='mobile-item-actions'>
          <FaPencilAlt className='manage-book-mobile-action-pencil' onClick={() => setEditModal(true)}/>
          <FaTrash className='manage-book-mobile-action-trash' onClick={() => setDeleteModal(true)}/>
      </div>
      <EditBookModal show={editModal} onHide={() => setEditModal(false)} book={book} />
      <DeleteConfirmationModal show={deleteModal} onHide={() => setDeleteModal(false)} onDelete={DeleteBook}/>
    </div>
  )
}

export default MobileItem