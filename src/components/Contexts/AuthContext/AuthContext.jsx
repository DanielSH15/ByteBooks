import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const Context = createContext();

const AuthProvider = ({children}) => {
    const[user, setUser] = useState({})
    const token = sessionStorage.getItem("token")

    useEffect(() => {
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

        fetchUserData()
    }, [])
  return (
    <Context.Provider value = {{user}}>
        {children}
    </Context.Provider>
  )
}

export {Context, AuthProvider}