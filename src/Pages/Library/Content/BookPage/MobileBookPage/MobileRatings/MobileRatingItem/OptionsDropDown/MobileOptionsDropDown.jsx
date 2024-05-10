import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import './MobileOptionsDropDown.css'
import EditReview from "../../../../../../../../components/Modals/EditReviewModal/EditReview";
import DeleteConfirmationModal from "../../../../../../../../components/Modals/DeleteConfirmation/DeleteConfirmationModal";
import axios from "axios";


const MobileOptionsDropDown = ({rating}) => {
  const [open, setOpen] = useState(false)
    const[openModal, setOpenModal] = useState(false)
    const[openDeleteModal, setOpenDeleteModal] = useState(false)
    
    const DeleteRating = async() => {
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/rating/' + rating.ratingId)
            .then((response) => {
                console.log(response.data)
            })
            window.location.reload(false)
        } catch (e) {
            console.log(e)
        }
    }


  return (
    <div className="mobile-rating-options-container">
      <div className="options-dots" onClick={() => setOpen(!open)}>
        <HiDotsHorizontal />
      </div>
      <div className={`mobile-options-menu ${open ? 'active' : 'inactive'}`}>
        <h4 onClick={() => {setOpenModal(true); setOpen(false)}}>Edit</h4>
        <h4 onClick={() => {setOpenDeleteModal(true); setOpen(false)}}>Delete</h4>
      </div>
      <EditReview show={openModal} onHide={() => setOpenModal(false)} rating={rating}/>
      <DeleteConfirmationModal show={openDeleteModal} onHide={() => setOpenDeleteModal(false)} onDelete={DeleteRating}/>
    </div>
  )
}

export default MobileOptionsDropDown