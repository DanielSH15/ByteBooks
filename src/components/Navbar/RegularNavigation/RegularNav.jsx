import React, { useState, useEffect } from 'react'
import './RegularNav.css'
import Logo from '../NavbarComponents/Logo/Logo'
import Bell from '../NavbarComponents/Bell/Bell'
import DropDownMenu from '../NavbarComponents/UserDropDown/DropDownMenu'
import axios from 'axios'
import Search from '../NavbarComponents/SearchBook/Search'

const RegularNav = () => {  
    const token = sessionStorage.getItem("token")  //user JWT token
  const id = localStorage.getItem("userId")  //get user's id
  const [username, setUsername] = useState('')  //set state for username
  const[accessKey, setAccessKey] = useState('')  //set state for access key
  const [user, setUser] = useState({})  //set state for the user
  const[books, setBooks] = useState([])  //set state for nbooks

  const config = {  //setup config params for the http request
    headers: {
      'Authorization': `Bearer ${JSON.parse(token)}`
    },
    params: {
      '_id': id
    }
}

  const getUser = async() =>{
    await axios.get(import.meta.env.VITE_BACKEND_URI + "/api/user/auth/", config).then((response) =>{
        setUsername(response.data.username)
        setAccessKey(response.data.accessKey)
        setUser(response.data)
        localStorage.setItem("userId", response.data.userId)
        if(response.data.borrowTime !== 0){
          localStorage.setItem("borrowTime", response.data.borrowTime)
        }
        sessionStorage.setItem("accessKey", response.data.accessKey)
    })
  }

  const GetBooks = async() => {
    try{
      await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book')
      .then((response) => {
        setBooks(response.data.Value)
      })
    } catch (e) {
      console.log(e)
    }
  }



useEffect(() =>{
    if(token){
      getUser()
      GetBooks()
      console.log(id)
    }
  }, [])

  return (
    <div className='userNavbarContainer'>
      <Logo />
      <DropDownMenu username = {username} accessKey={accessKey} user={user}/>
      <Bell />
      <div className='search-book-container'>
        <Search books={books}/>
      </div>
    </div>
  )
}   

export default RegularNav;