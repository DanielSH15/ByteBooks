import React from 'react'
import './CancelButton.css'

const CancelButton = ({text, action}) => {
  return (
    <button className='cancel-button-modal'  onClick={action}>
        {text}
    </button>
  )
}

export default CancelButton