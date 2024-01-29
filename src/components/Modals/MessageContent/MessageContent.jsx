import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'

const MessageContent = ({show, onHide, message}) => {
    var newMsg;
    if(Array.isArray(message)){
        newMsg = message.join(`\n`);
        console.log(newMsg)
    } else {
        newMsg = message;
    }

  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <pre><h5 style={{fontWeight: '700'}}>{newMsg}</h5></pre>
            </Modal.Body>
        </Modal>
  )
}

export default MessageContent