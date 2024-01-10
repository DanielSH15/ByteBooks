import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';


const BorrowedBookInfo = ({show, book, onHide}) => {
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
        await axios.delete('http://localhost:5226/api/borrowedbooks/' + book.bookId)
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
                    <h4 style={{marginLeft: '30px'}}>{book.description}</h4>
                </Modal.Body>
                <Modal.Footer>
                <Button className='addgenreAM' onClick={HandleReturn}>Return</Button>
                <Button className='canceladdAM'>Read more</Button>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
  )
}

export default BorrowedBookInfo