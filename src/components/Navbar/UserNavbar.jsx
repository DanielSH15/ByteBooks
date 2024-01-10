import React, { useState, useEffect } from 'react'
import './UserNavbar.css'
import Logo from './NavbarComponents/Logo/Logo'
import Search from './NavbarComponents/Input/Search'
import UserIcon from './NavbarComponents/UserIcon/UserIcon'
import Bell from './NavbarComponents/Bell/Bell'
import DropDownMenu from './NavbarComponents/UserDropDown/DropDownMenu'
import axios from 'axios'

const UserNavbar = () => {
  const token = sessionStorage.getItem("token")
  const id = localStorage.getItem("userId")
  const [username, setUsername] = useState('')
  const[accessKey, setAccessKey] = useState('')
  const [user, setUser] = useState({})
  const [userGenres, setUserGenres] = useState([])

  const config = {
    headers: {
      'Authorization': `Bearer ${JSON.parse(token)}`
    },
    params: {
      '_id': id
    }
}

  const getUser = async() =>{
    await axios.get("http://localhost:5226" + "/api/user/auth/", config).then((response) =>{
        setUsername(response.data.username)
        setAccessKey(response.data.accessKey)
        setUser(response.data)
        console.log(response.data)
        localStorage.setItem("userId", response.data.userId)
        sessionStorage.setItem("accessKey", response.data.accessKey)
    })
}



useEffect(() =>{
    if(token){
      getUser()
      console.log(id)
    }
  }, [])

  return (
    <div className='userNavbarContainer'>
      <Logo />
      <DropDownMenu username = {username} accessKey={accessKey} user={user}/>
      <Bell />
      <div className='searchWrapper'>
        <Search />
      </div>
    </div>
  )
}

export default UserNavbar