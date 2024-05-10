import React, { useState } from 'react'
import './MessageItem.css'
import MessageContent from '../../../../../Modals/MessageContent/MessageContent'
import ReadNotification from '../../../../../Modals/ReadNotification/ReadNotification'
import { HiExclamationCircle } from 'react-icons/hi'

const MessageItem = ({message}) => {
    const[open, setOpen] = useState(false)
    const criticalIcon = message.isCritical ? <HiExclamationCircle /> : null
  return (
    <div className='message-item-container'>
        <div>
            <span onClick={() => setOpen(true)}>{message.content.slice(0, 30)} ...</span>
            <span>
              {criticalIcon}
            </span>
            <ReadNotification show={open} onHide={() => setOpen(false)} message={message} />
        </div>
    </div>
  )
}

export default MessageItem