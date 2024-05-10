import React from 'react'
import { Modal } from 'react-bootstrap';

const BorrowBookInfo = ({show, onHide, message}) => {  //THIS MODAL DISPLAYS THE ERROR AFTER BORROWING A BOOK (IF THERE IS ONE)
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
                <Modal.Footer style={{display: 'flex', justifyContent:'center'}}>
                <div><h3>{message}</h3></div>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
  )
}

export default BorrowBookInfo