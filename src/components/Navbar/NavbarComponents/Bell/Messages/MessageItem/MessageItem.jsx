import React, { useState } from 'react'
import './MessageItem.css'
import MessageContent from '../../../../../Modals/MessageContent/MessageContent'
import ReadNotification from '../../../../../Modals/ReadNotification/ReadNotification'

const MessageItem = ({message}) => {
    const[open, setOpen] = useState(false)

  return (
    <div className='message-item-container'>
        <div>
            <span onClick={() => setOpen(true)}>{message.content.slice(0, 30)} ...</span>
            <ReadNotification show={open} onHide={() => setOpen(false)} message={message} />
        </div>
    </div>
  )
}

export default MessageItem