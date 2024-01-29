import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

const BorrowBookInfo = ({show, onHide, message}) => {
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