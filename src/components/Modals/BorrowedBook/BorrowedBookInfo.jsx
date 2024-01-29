import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './BorrowedBookInfo.css'


const BorrowedBookInfo = ({show, book, onHide}) => {
    const[readMore, setIsReadMore] = useState(false)
    if(!show){
        return null
    }
    let thumbnail = book.photoFileName
    var id = localStorage.getItem("userId")

    const insert = {
        userId: id,
        bookId: book.bookId
    }

    const HandleReturn = async() => {
       try{
        await axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/borrowedbooks/' + book.bookId)
        .then((response) => {
            console.log(response.data)
        })
        window.location.reload(false)
       } catch (e){
        console.log(e.response.data)
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
                <Modal.Title>{book.name} by {book.author}</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{display: 'flex'}}>
                    <img src={thumbnail} style={{height:'450px', width:'220px'}}/>
                    <div style={{marginLeft: '30px'}}>
                        <h4>{readMore ? book.description : `${book.description.slice(0, 445)} ...`}</h4>
                        <a onClick={() => setIsReadMore(!readMore)} className='read-more-button'>{readMore ? 'Read Less' : 'Read More'}</a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='actions-container'>
                        <a href={book.previewLink} target='_blank'><Button className='read-more-button-action'>Read more</Button></a>
                        <Button onClick={HandleReturn} className='return-book-button'>Return</Button>
                    </div>
                  </Modal.Footer>
        </Modal>
  )
}

export default BorrowedBookInfo