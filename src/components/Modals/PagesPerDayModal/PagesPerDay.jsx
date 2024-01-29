import React from 'react'
import { Modal, Form } from 'react-bootstrap';

const PagesPerDay = ({show, onHide, setPagesPerDay, action}) => {
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Pages per day</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>
                    Please, tell us how many pages of this book are you planning to read every day?
                    This will help us determine the borrowing time of the book.
                    <br />
                    Leaving this field empty will give you the default time (test results + 2 weeks).
                </h5>
                <Form.Control placeholder="Pages" type="number" style={{marginTop: '3vh'}} onChange={(e) => setPagesPerDay(e.target.value)}/>
                <button className="submit-pages-button" onClick={action}>Submit</button>
            </Modal.Body>
                <Modal.Footer>
                <button onClick={onHide} className="close-explanation-button">Close</button>
                  </Modal.Footer>
        </Modal>
  )
}

export default PagesPerDay