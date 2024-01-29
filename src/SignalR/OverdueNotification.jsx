import React, { useEffect, useState } from 'react'
import MessageContent from '../components/Modals/MessageContent/MessageContent'
import GetOverdueBooks from '../Pages/Library/Content/OverdueBooks/GetData/Data'

const OverdueNotification = () => {
    const[open, setOpen] = useState(false)
    const[opened, setOpened] = useState(false)

    useEffect(() => {
        const GetData = async() => {
            try{
                var newData = await GetOverdueBooks()
                if(newData.length > 0){
                    setOpen(true)
                    setOpened(true)
                }
            } catch (e){
                console.log(e)
            }
        }
        if(!opened){
            GetData()
        }
    }, [])

  return (
    <MessageContent show={open} onHide={() => setOpen(false)} message={"You have books that need to be returned. Check overdue books in the library"}/>
  )
}

export default OverdueNotification