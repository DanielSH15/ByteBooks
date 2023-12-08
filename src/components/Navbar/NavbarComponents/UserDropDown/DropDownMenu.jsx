import React, {useState} from 'react'
import DropDownItem from './DropDownItem/DropDownItem'
import {HiOutlineUser, HiPencil, HiLogout, HiShoppingCart} from 'react-icons/hi'
import {GrUserSettings} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import './DropDownMenu.css'

const DropDownMenu = (props) => {
  const[open, setOpen] = useState(false)
  const navigate = useNavigate()

  const logout = () =>{
    sessionStorage.removeItem("token")
    navigate('/')
    window.location.reload()
}


  if(props.accessKey === 1){
    return (
      <div className='menuContainer'> 
        <div className='icon' onClick={() => {setOpen(!open)}}>
        </div>

        <div className={`dropdownMenu ${open? 'active' : 'inactive'}`}>
          <h3>{props.username}<br /> <span>User</span></h3>
          <DropDownItem icon = {<HiPencil />} text = "Profile" location = "/profile" do = {() => {setOpen(false)}}/>
          <DropDownItem icon = {<HiShoppingCart />} text = "Cart" location = "/cart" do = {() => {setOpen(false)}}/>
          <DropDownItem icon = {<HiLogout />} text = "Logout" location = "/" do = {logout}/>
        </div>
      </div>
    )
  } else if(props.accessKey === 5){
    return (
      <div className='menuContainer'> 
        <div className='icon' onClick={() => {setOpen(!open)}}>
        </div>
        <div className={`dropdownMenu ${open? 'active' : 'inactive'}`}>
          <h3>{props.username}<br /> <span>Moderator</span></h3>
          <DropDownItem icon = {<HiPencil />} text = "Profile" location = "/profile" do = {() => {setOpen(false)}}/>
          <DropDownItem icon = {<HiLogout />} text = "Logout" location = "/" do = {logout}/>
        </div>
      </div>
    )
  } else if(props.accessKey === 10){
    return (
      <div className='menuContainer'> 
        <div className='icon' onClick={() => {setOpen(!open)}}>
        </div>
        <div className={`dropdownMenu ${open? 'active' : 'inactive'}`}>
          <h3>{props.username}<br /> <span>Admin</span></h3>
          <DropDownItem icon = {<HiPencil />} text = "Profile" location = "/profile" do = {() => {setOpen(false)}}/>
          <DropDownItem icon = {<GrUserSettings />} text = "Admin" location = "/admin" do = {() => {setOpen(false)}}/>
          <DropDownItem icon = {<HiLogout />} text = "Logout" location = "/" do = {logout}/>
        </div>
      </div>
    )
  }
}

export default DropDownMenu