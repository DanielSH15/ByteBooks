import React from 'react'
import { Navbar } from './Navbar'
import UserNavbar from './UserNavbar'


const GeneralNavBar = () => {
  const token = sessionStorage.getItem("token")
  if(token != null){
    return (
      <UserNavbar />
    )
  } else {
    return (
      <Navbar />
    )
  }
}

export default GeneralNavBar