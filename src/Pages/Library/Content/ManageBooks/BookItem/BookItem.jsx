import React, { useState } from 'react'
import './BookItem.css'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import EditBookModal from '../../../../../components/Modals/EditBook/EditBookModal'
import axios from 'axios'
import DeleteConfirmationModal from '../../../../../components/Modals/DeleteConfirmation/DeleteConfirmationModal'

const BookItem = ({book, key}) => {
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
    <div className='manage-book-item-container' key={key}>
        <div className='manage-book-image-container'>
            <img src={imgsrc}/>
        </div>
        <div className='manage-book-content-container'>
            <h1>{book.name}</h1>
            <div className='manage-book-actions-container'>
                <FaPencilAlt className='manage-book-action-pencil' onClick={() => setEditModal(true)}/>
                <FaTrash className='manage-book-action-trash' onClick={() => setDeleteModal(true)}/>
            </div>
        </div>
        <EditBookModal show={editModal} onHide={() => setEditModal(false)} book={book} />
        <DeleteConfirmationModal show={deleteModal} onHide={() => setDeleteModal(false)} onDelete={DeleteBook}/>
    </div>
  )
}

export default BookItem