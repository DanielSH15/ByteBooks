import React, { useState } from 'react'
import './Content.css'
import { HiX } from 'react-icons/hi'
import ContentItem from './ContentItem/ContentItem'
import LoginModal from '../../../Modals/Login/LoginModal'
import RegistrationModal from '../../../Modals/Registration/RegistrationModal'

const Content = ({isOpen, setIsOpen}) => {
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalRegOpen, setModalRegOpen] = useState(false)

    const openLoginModal = () => {
        setModalLoginOpen(true)
        setIsOpen(false)
    }

    const openRegistrationModal = () => {
        setModalRegOpen(true)
        setIsOpen(false)
    }

    const items = [
        {
            name: "About"
        },
        {
            name: "Login",
            action: openLoginModal
        },
        {
            name: "Registration",
            action: openRegistrationModal
        }
    ]
    return (
        <div className='side-nav-bar-content' style={{transform: isOpen ? "translateY(0)" : "translateY(-100vh)"}}>
            <div className='toggle-close'>
                <HiX onClick={() => setIsOpen(false)}/>
            </div>
            <div className='side-nav-bar-items'>
                {
                    items.map((item, i) => (
                        <div className='side-nav-content-item' onClick={() => item.action()}>
                           <ContentItem name={item.name} />
                        </div>
                    ))
                }
            </div>
            <LoginModal show={modalLoginOpen} onHide={() => setModalLoginOpen(false)}/>
            <RegistrationModal show={modalRegOpen} onHide={() => setModalRegOpen(false)}/>
        </div>
    )
}

export default Content