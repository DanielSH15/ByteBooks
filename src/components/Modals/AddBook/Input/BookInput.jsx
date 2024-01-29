import React, {useState} from "react";
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';

const BookInput = (props) => {
    const [displayMessage, setDisplayMessage] = useState("")
    const [focused, setFocused] = useState("")
    var data = document.getElementById(props.id)

    const handleFocus = (e) => {
        setFocused(true)
        if(props.regex != null){
          if(props.regex.test(data.value) === false){
            setDisplayMessage(props.errorMessage)
          } else {
            setDisplayMessage("")
        }
        }
      }

    return(
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            required
            onChange={props.action}
            id={props.id}
            onBlur={handleFocus}
            />
            <span style={{color: 'red'}}>{displayMessage}</span>
        </Form.Group>
    )
}

export default BookInput