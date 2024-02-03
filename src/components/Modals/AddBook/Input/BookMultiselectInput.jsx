import React from 'react'
import Select from 'react-select';
import { Form } from 'react-bootstrap';

const BookMultiselectInput = (props) => {
  return (
    <Form.Group>
        <Form.Label>Genres</Form.Label>
        <Select options={props.options} isMulti value={props.value} onChange={props.onChange}
        onBlur={props.onBlur} />
        <span style={{color: 'red'}}>{props.touched && props.error ? props.error : ''}</span>
    </Form.Group>
  )
}

export default BookMultiselectInput