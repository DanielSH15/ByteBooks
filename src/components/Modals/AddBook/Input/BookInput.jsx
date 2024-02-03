import React from "react";
import { Form } from 'react-bootstrap';

const BookInput = (props) => {

    return(
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            required
            onChange={props.onChange}
            id={props.id}
            onBlur={props.onBlur}
            defaultValue={props.defaultValue}
            />
            <span style={{color: 'red'}}>{props.touched && props.error ? props.error : ''}</span>
        </Form.Group>
    )
}

export default BookInput