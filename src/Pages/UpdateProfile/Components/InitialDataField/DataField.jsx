import React, { useState } from 'react'
import './DataField.css'
import {HiPencil, HiSave, HiX} from 'react-icons/hi'

const DataField = (props) => {

    return (
        <div className='data-field-wrapper'>
            <div className="data-field-title-container">
                <div className="data-field-title">{props.label}</div>
            </div>
            <div className="data-field-contents">
                <div className="data-field-data">
                <input
                type={props.type}
                onChange={props.onChange}
                defaultValue={props.defaultValue} 
                id={props.id}
                onBlur={props.handleBlur}
                required
                 /></div>    
                <span className='input-field-error'>{props.touched && props.error ? props.error : ''}</span>   
            </div>
        </div>
    )
}

export default DataField