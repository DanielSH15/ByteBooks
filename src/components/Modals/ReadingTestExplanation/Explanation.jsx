import React from "react";
import { Modal, Form } from 'react-bootstrap';
import './Explanation.css'

const Explanation = ({show, onHide, setPagesPerDay}) => {
    return(
        <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Reading Test Explanation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>
                    This is a reading test.
                    It is made to define your reading time and help adjust the borrowing time of a book.
                    At the start of the timer, you will be given a reading page. You need to read the page
                    at your own regular pace, and when you finish, stop the timer.
                    Note: You will be able to take this test only once! It is important to be honest
                    about it, because you will not be able to take this test again.
                    You will not be able to take it another time!
                    Before proceeding, you need to tell how many pages you are planning
                    to read each day. Leaving the field empty will give you the default time for borrowing (test results + 2 weeks).
                </h5>
                <Form.Control placeholder="Pages" type="number" style={{marginTop: '3vh'}} onChange={(e) => setPagesPerDay(e.target.value)}/>
                <button className="submit-pages-button">Submit</button>
            </Modal.Body>
                <Modal.Footer>
                <button onClick={onHide} className="close-explanation-button">Close</button>
                  </Modal.Footer>
        </Modal>
    )
}

export default Explanation