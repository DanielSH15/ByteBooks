import React, { useEffect, useState } from 'react'
import './Messages.css'
import MessageItem from './MessageItem/MessageItem'
import axios from 'axios'
import MessageContent from '../../../../Modals/MessageContent/MessageContent'

const Messages = ({open}) => {
    const[messages, setMessages] = useState([])
    const[modalOpen, setModalOpen] = useState(false)
    const[flag, setFlag] = useState(false)
    const id = localStorage.getItem("userId")


    useEffect(() => {
        const GetMessages = async() => {
            try{
                await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/user/getusermessages/' + JSON.parse(id))
                .then((response) => {
                    setMessages(response.data)
                    if(response.data.length > 0 && !flag){
                        console.log('modal open')
                        setModalOpen(true)
                        setFlag(true)
                    }
                })
            } catch (e) {
                console.log(e.response.data)
            }
        }
        
        GetMessages()
    }, [])


    const CheckData = () => {
        if(messages.length > 0){
            return(
                <div className='messages-container-content'>
                {
                    messages.map((value, i) => {
                        return(
                            <MessageItem message={value} key={i}/>
                        )
                    })
                }
            </div>
            )
        } else {
            return (
            <div className='messages-container-content' style={{textAlign: 'center'}}>
                <h4>No messages</h4>
            </div>
            )
        }
    }

  return (
    <div className={`messages-container ${open ? 'active' : 'inactive'}`}>
        <h4>Notifications</h4>
        <hr />
        {CheckData()}
        <MessageContent show={modalOpen} onHide={() => setModalOpen(false)} message={`You have ${messages.length} new messages!`}/>
    </div>
  )
}

export default Messages