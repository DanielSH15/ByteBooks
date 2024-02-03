import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import './EditReview.css'
import axios from 'axios';
import MessageContent from '../../Modals/MessageContent/MessageContent'

const EditReview = ({show, onHide, rating}) => {
    const[content, setContent] = useState(rating.content)
    const[message, setMessage] = useState('')
    const[messageModalOpen, setMessageModalOpen] = useState(false)

    const UpdateRating = async() => {
        var data = {
            userId: JSON.parse(localStorage.getItem("userId")),
            bookId: rating.bookId,
            content: content
        }
        try{
            await axios.put(import.meta.env.VITE_BACKEND_URI + '/api/rating', data)
            .then((response) => {
                setMessage(response.data)
                setMessageModalOpen(true)
            })
        } catch (e) {
            console.log(e)
            setMessage(e.response.data)
            setMessageModalOpen(true)
        }
    }
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea defaultValue={rating.content} className='review-text-area' onChange={(e) => setContent(e.target.value)}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <div className='edit-review-action-container'>
                    <button onClick={onHide} className='cancel-edit-review-button'>Cancel</button>
                    <button className='edit-review-button' onClick={UpdateRating}>Edit</button>
                </div>
            </Modal.Footer>
            <MessageContent show={messageModalOpen} onHide={() => setMessageModalOpen(false)} message={message}/>
    </Modal>
  )
}

export default EditReview