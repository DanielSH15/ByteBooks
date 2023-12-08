import React, { useState } from 'react'
import InitDashboard from './InitDashboard/InitDashboard'
import UserDashboard from './UserDashboard/UserDashboard'

const Dashboard = () => {
  const token = sessionStorage.getItem("token")
  if(token){
    return(
      <UserDashboard />
    )
  } else {
    return (
      <InitDashboard />
    )
  }
}

export default Dashboard