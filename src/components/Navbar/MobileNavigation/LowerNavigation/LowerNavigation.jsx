import React from 'react'
import './LowerNavigation.css'
import LowerNavItem from './LowerNavItem/LowerNavItem'
import { HiLogout, HiUser } from 'react-icons/hi'
import { AdminNavItems, UserNavItems } from './LowerNavUserItems/AdminItems'
import { useNavigate } from 'react-router-dom'

const LowerNavigation = () => {
  const adminNavItems = AdminNavItems;
  const userNavItems = UserNavItems;
  const accessKey = JSON.parse(sessionStorage.getItem("accessKey"))
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem("token")
    navigate('/')
    window.location.reload()
  }


  return (
    <div className='lower-navigation-wrapper'>
        <div className='lower-nav-item-container'>
          {
            accessKey === 10 ? adminNavItems.map((value, i) => {
              return(
                <LowerNavItem icon = {value.icon} title = {value.title} key={i} path = {value.route} action = {value.action}/>
              )
            }
            ) : userNavItems.map((value, i) => (
              <LowerNavItem icon = {value.icon} title = {value.title} key={i} path = {value.route} action = {value.action}/>
            ))
          }
          <LowerNavItem icon={<HiLogout />} title="Logout" action = {logout}/>
        </div>
    </div>
  )
}

export default LowerNavigation