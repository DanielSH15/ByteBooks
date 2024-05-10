import React, { useState } from 'react'
import './GuestSideNavbar.css'
import { FaBars } from 'react-icons/fa'
import Logo from '../NavbarComponents/Logo/Logo'
import Content from './Content/Content'

const SideNavbar = () => {
    const[isOpen, setIsOpen] = useState(false)

    return (
        <div className='navigation-bar-container-res'>
            <div className='navigation-bar-res-logo'>
                <Logo />
            </div>
            <div className='navigation-bar-res'>
                <div className='toggle-bars'>
                        <FaBars onClick={() => setIsOpen(!isOpen)} style={{fontSize: '30px'}}/>
                </div>
                <div className='navigation-bar-res-content' style={{transform: isOpen ? "translateY(0)" : "translateY(-100vh)"}}>
                    <Content isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar