import React from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

const SelectInput = (props) => {
  return (
    <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <Select options={props.options} defaultValue={props.defaultValue} onChange={props.onChange}
        onBlur={props.onBlur} />
        <span style={{color: 'red'}}>{props.touched && props.error ? props.error : ''}</span>
    </Form.Group>
  )
}

export default SelectInput