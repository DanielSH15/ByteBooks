import React from 'react'
import {HiX} from'react-icons/hi' 
import '../BookInfo/BookInfoModal.css'

const CustomBookInfo = ({show, book, onClose}) => {
    if(!show){
        return null
    }
    let thumbnail = import.meta.env.VITE_BACKEND_URI + '/Photos' + book.photoFileName

  return (
    <>
       <div className='overlay'>
         <div className='overlay-inner'>
            <HiX className='close' onClick={onClose}/>
            <div className='inner-box'>
                <img src={thumbnail}/>
                <div className='info'>
                    <h1>{book.name}</h1>
                    <h2 style={{fontSize: '20px', color: 'green'}}>{book.author}</h2>
                    <h4>{book.author} <br /><span>{book.releaseDate}</span></h4>
                    <a href={book.previewLink} target="_blank"><button>More</button></a>
                </div>
            </div>
            <h4 className='description'>
                {book.description}
            </h4>
         </div>
      </div>
    </>
  )
}

export default CustomBookInfo