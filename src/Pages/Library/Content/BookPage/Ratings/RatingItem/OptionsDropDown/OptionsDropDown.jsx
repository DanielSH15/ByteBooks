import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import './OptionsDropDown.css'

const OptionsDropDown = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="options-menu-container">
            <div className="dots-options">
                <HiDotsHorizontal onClick={() => setOpen(!open)}/>
            </div>
            <div className={`options-menu ${open ? 'active' : 'inactive'}`}>
                <h4>Edit</h4>
                <h4>Delete</h4>
            </div>
        </div>
    )
}

export default OptionsDropDown