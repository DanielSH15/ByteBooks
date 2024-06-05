import React, { useState } from 'react'
import { FaBars, FaBook, FaPlus, FaStar, FaInfo, FaEdit, FaCheck, FaSearch } from 'react-icons/fa'
import MenuItem from '../../MenuItem/MenuItem'
import './AdminSideNav.css'
import { HiCalendar } from 'react-icons/hi'


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
            name: "Add Book",
            icon: <FaPlus />,
            page: 'addbook',
            path: '/addbook'
        },
        {
            name: "Statistics",
            icon: <FaInfo />,
            page: 'stats',
            path: '/statistics'
        },
        {
            name: "Manage Books",
            icon: <FaEdit />,
            page: 'manage',
            path: '/managebooks'
        },
        {
            name: "Pending Applied Books",
            icon: <FaCheck />,
            page: 'pendingbooks',
            path: '/pendingbooks'
        },
        {
            name: "Recommendations",
            icon: <FaStar />,
            page: 'recommendations'
        },
        {
            name: "Find By Genre",
            icon: <FaSearch />,
            page: 'findbygenre'
        },
        {
            name: "Overdue Books",
            icon: <HiCalendar />,
            path: '/overduebooks'
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
                       <MenuItem index={i} name={item.name} icon={item.icon} isOpen={isOpen} path={item.path}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AdminSideNav