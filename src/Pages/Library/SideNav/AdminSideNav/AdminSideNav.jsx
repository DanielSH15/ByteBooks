import React, { useState } from 'react'
import { FaBars, FaBook, FaPlus, FaStar, FaInfo, FaEdit } from 'react-icons/fa'
import MenuItem from '../../MenuItem/MenuItem'
import './AdminSideNav.css'


const AdminSideNav = ({changePage}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)


    const menuItems = [
        {
            name: "Library",
            icon: <FaBook />,
            page: 'library',
        },
        {
            name: "Recommendations",
            icon: <FaStar />,
            page: 'recommendations',
        },
        {
            name: "Add Book",
            icon: <FaPlus />,
            page: 'addbook'
        },
        {
            name: "Statistics",
            icon: <FaInfo />,
            page: 'stats'
        },
        {
            name: "Manage Books",
            icon: <FaEdit />,
            page: 'manage'
        }
    ]

  return (
    <div className="side-nav-container">
        <div className="side-bar" style={{width: isOpen ? "300px" : "50px"}}>
            <div className="top-section">
                <h1 className="side-nav-title" style={{display: isOpen ? "block" : "none"}}>Menu</h1>
                <div className='side-nav-arrow' style={{marginLeft: isOpen ? "150px" : "0px"}}>
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItems.map((item, i) => (
                    <div className='side-nav-menu-item' onClick={() => changePage(item.page)}>
                       <MenuItem index={i} name={item.name} icon={item.icon} isOpen={isOpen}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AdminSideNav