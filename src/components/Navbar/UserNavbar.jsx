import React, { useState, useEffect } from 'react'
import './UserNavbar.css'
import Logo from './NavbarComponents/Logo/Logo'
import UserIcon from './NavbarComponents/UserIcon/UserIcon'
import Bell from './NavbarComponents/Bell/Bell'
import DropDownMenu from './NavbarComponents/UserDropDown/DropDownMenu'
import axios from 'axios'
import Search from './NavbarComponents/SearchBook/Search'

const UserNavbar = () => {
  const token = sessionStorage.getItem("token")
  const id = localStorage.getItem("userId")
  const [username, setUsername] = useState('')
  const[accessKey, setAccessKey] = useState('')
  const [user, setUser] = useState({})
  const[books, setBooks] = useState([])

  const config = {
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
        localStorage.setItem("borrowTime", response.data.borrowTime)
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

export default UserNavbar