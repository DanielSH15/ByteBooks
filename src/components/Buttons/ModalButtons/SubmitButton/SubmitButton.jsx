import React from 'react'
import './SubmitButton.css'

const SubmitButton = ({text, action}) => {
  return (
    <button className='submit-button-modal' onClick={action}>
        {text}
    </button>
  )
}

export default SubmitButton