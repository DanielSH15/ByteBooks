import React from 'react'
import { Modal } from 'react-bootstrap';
import './DeleteConfirmationModal.css'

const DeleteConfirmationModal = ({show, onHide, onDelete}) => {
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
                <Modal.Footer>
                <button className='delete-book-button' onClick={onDelete}>Delete</button>
                <button className='cancel-button' onClick={onHide}>Cancel</button>
                <br />
                <br />
                  </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmationModal