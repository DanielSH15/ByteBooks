import React, { useContext, useEffect } from 'react'
import { Navbar } from './Navbar'
import UserNavbar from './UserNavbar'
import { Context } from '../Contexts/AuthContext/AuthContext'


const GeneralNavBar = () => {
  const token = sessionStorage.getItem("token")  //check if there is a logged user

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

