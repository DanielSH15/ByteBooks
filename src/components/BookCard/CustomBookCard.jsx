import React, { useEffect } from 'react'
import './BookCard.css'
import { Image } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import CustomBookInfo from '../Modals/CustomBookInfo/CustomBookInfo'
import BookInfoModal from '../Modals/BookInfo/BookInfoModal'

const CustomBookCard = ({book, isLocal}) => {
    let thumbnail = book.photoFileName
    const [show, setShow] = useState(false)
    const [bookItem, setItem] = useState([])
    
    const Adjust = () => {
        if(isLocal === false){
           return(
            <BookInfoModal show = {show} book = {book} onClose={() => setShow(false)}/>
           )
        } else {
           return(
            <CustomBookInfo show = {show} book = {book} onClose={() => setShow(false)}/>
           )
        }
    }

    if(thumbnail != undefined){
        return (
            <div>
                <div className='bookCard' onClick={() => {setShow(true)}}>
                    <img src={thumbnail} className='testImg'/>
                    <div className='bottomCard'>
                        <h3 className='titleCard'>{book.name}</h3>
                    </div>
                </div>
                {Adjust()}
            </div>
        )
    }
}

export default CustomBookCard