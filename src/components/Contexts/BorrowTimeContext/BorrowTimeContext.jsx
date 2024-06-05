import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../AuthContext/AuthContext'

const BorrowTimeContext = createContext()

const BorrowTimeProvider = ({children}) => {
    const [borrowTime, setBorrowTime] = useState(0)
    const[isBanned, setIsBanned] = useState(false)
    const token = sessionStorage.getItem("token")
    const[user, setUser] = useState({})

    const fetchUserData = async() => {
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URI + "/api/user/auth/", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        } catch (e){
            console.log("Error fetching user data");
        }
    }

    useEffect(() => {
        fetchUserData()
        console.log(user)
    }, [])

    useEffect(() => {
        setBorrowTime(user.borrowTime)
        setIsBanned(user.isBanned)
        console.log(user.borrowTime)
    }, [user])

  return (
    <BorrowTimeContext.Provider value={{borrowTime, isBanned}}>
        {children}
    </BorrowTimeContext.Provider>
  )
}

export {BorrowTimeContext, BorrowTimeProvider}