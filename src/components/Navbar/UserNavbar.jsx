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
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const[accessKey, setAccessKey] = useState('')

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
        setId(response.data.userId)
        setUsername(response.data.username)
        setAccessKey(response.data.accessKey)
        localStorage.setItem("genre", response.data.genre)
        localStorage.setItem("userId", response.data.userId)
    })
}


useEffect(() =>{
    if(token){
      getUser()
      sessionStorage.setItem("accessKey", JSON.stringify(accessKey))
    }
  }, [])

  return (
    <div className='userNavbarContainer'>
      <Logo />
      <DropDownMenu username = {username} accessKey={accessKey}/>
      <Bell />
      <div className='searchWrapper'>
        <Search />
      </div>
    </div>
  )
}

export default UserNavbar