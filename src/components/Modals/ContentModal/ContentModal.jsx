import React from 'react'
import { Modal } from 'react-bootstrap';

const ContentModal = ({show, onHide, content}) => {
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Select Your Favorite Genres</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    content
                }
            </Modal.Body>
                <Modal.Footer>
                <button className='submit-pages-button' onClick={onHide}>Submit</button>
            </Modal.Footer>
        </Modal>
  )
}

export default ContentModal