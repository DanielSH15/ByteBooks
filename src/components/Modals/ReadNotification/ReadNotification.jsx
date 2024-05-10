import React from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import './ReadNotification.css'

const ReadNotification = ({show, onHide, message}) => {
    const title = message.isCritical ? "Notification content - critical" : "Notification content"
    const ReadMessage = async() => {
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URI + "/api/user/deletemessage/" + message.messageId)
            .then((response) => {
                console.log(response.data)
            })
            onHide
            window.location.reload(false)
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <Modal
        size='lg'
        centered
        show={show}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message.content}
            </Modal.Body>
            <Modal.Footer>
                <div className='read-button-container'>
                    <button onClick={ReadMessage} className='read-notification-button'>Close</button>
                </div>
            </Modal.Footer>
        </Modal>
  )
}

export default ReadNotification