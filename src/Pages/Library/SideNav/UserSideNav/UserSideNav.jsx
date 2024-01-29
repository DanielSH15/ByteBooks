import React, { useState } from 'react'
import { FaBars, FaBook, FaPlus, FaStar, FaInfo, FaEdit, FaSearch, FaBookOpen } from 'react-icons/fa'
import MenuItem from '../../MenuItem/MenuItem'
import './UserSideNav.css'
import ApplyBook from '../../../../components/Modals/ApplyBook/ApplyBook'
import { HiCalendar } from 'react-icons/hi'


const UserSideNav = ({changePage}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [addBookModalOpen, setAddBookModalOpen] = useState(false)
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
            page: 'recommendations'
        },
        {
            name: "Find By Genre",
            icon: <FaSearch />,
            page: 'findbygenre'
        },
        {
            name: "Your Applied Books",
            icon: <FaBookOpen />,
            page: 'userappliedbooks',
            path: '/userappliedbooks'
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
                       <MenuItem index={i} name={item.name} icon={item.icon} modal={item.modal} isOpen={isOpen} path={item.path}/>
                    </div>
                ))
            }
            <div className='side-nav-menu-item'>
               <MenuItem name={'Apply Book'} icon={<FaPlus />} do={() => setAddBookModalOpen(true)} isOpen={isOpen}/>
            </div>
        </div>
        <ApplyBook show={addBookModalOpen} onHide={() => setAddBookModalOpen(false)}/>
    </div>
  )
}

export default UserSideNav