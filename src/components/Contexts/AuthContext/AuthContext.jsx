import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Context = createContext();

const AuthProvider = ({children}) => {
    const[user, setUser] = useState({})
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate()


    const fetchUserData = async() => {
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URI + "/api/user/auth/", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
                setUsername(response.data.username)
                setPassword(response.data.password)
            })
        } catch (e){
            console.log("Error fetching user data");
        }
    }

    const refreshToken = async(user) => {
        if(user != null){
            try{
                await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/login', {
                 username: user.username,
                 password: user.password
                }).then((response) => {
                 console.log(response.data)
                 sessionStorage.setItem("token", JSON.stringify(response.data))
                 window.location = "/"
                })
             
            } catch (e) {
                throw e;
            }
        } else {
            await fetchUserData();
            try{
                await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/login', {
                 username: username,
                 password: password
                }).then((response) => {
                 console.log(response.data)
                 sessionStorage.setItem("token", JSON.stringify(response.data))
                 window.location = "/"
                })
             
            } catch (e) {
                throw e;
            }
        }
    }

    const logout = () =>{
        sessionStorage.removeItem("token")
        navigate('/')
        window.location.reload()
    }


    useEffect(() => {
        fetchUserData()
    }, [])
  return (
    <Context.Provider value = {{user, logout, refreshToken}}>
        {children}
    </Context.Provider>
  )
}

export {Context, AuthProvider}