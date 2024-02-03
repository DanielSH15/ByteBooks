import React, {useEffect, useState} from 'react'
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const UserMultiSelectInput = (props) => {
  return (
    <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <Select options={props.options} isMulti defaultValue={props.selectedOptions} onChange={props.onChange}
        onBlur={props.onBlur} />
        <span style={{color: 'red'}}>{props.touched && props.error ? props.error : ''}</span>
    </Form.Group>
  )
}

export default UserMultiSelectInput