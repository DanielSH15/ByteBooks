import React, { useEffect } from 'react'
import {HiX} from'react-icons/hi' 
import './BookInfoModal.css'
import axios from 'axios'

const BookInfoModal = ({show, book, onClose}) => {
    if(!show){
        return null
    }
    let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
    
    var genres = book.volumeInfo.categories ?  [{label: book.volumeInfo.categories[0], value: book.volumeInfo.categories[0]}] : null

    var insert = {
      name: book.volumeInfo.title,
      genres: genres,
      author: book.volumeInfo.authors[0],
      description: book.volumeInfo.description,
      releaseDate: book.volumeInfo.publishedDate,
      pages: book.volumeInfo.pageCount,
      photoFileName: thumbnail,
      previewLink: book.volumeInfo.previewLink
    }

    const AddBook = async() => {
      try{
        await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/book', insert)
        .then((response) => {
          console.log(response.data)
        })
      } catch (e) {
        console.log(e.response.data)
      }
    }

  return (
    <>
       <div className='overlay'>
         <div className='overlay-inner'>
            <HiX className='close' onClick={onClose}/>
            <div className='inner-box'>
                <img src={thumbnail}/>
                <div className='info'>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2 style={{fontSize: '20px', color: 'green'}}>{book.volumeInfo.authors}</h2>
                    <h4>{book.volumeInfo.publisher} <br /><span>{book.volumeInfo.publishedDate}</span></h4>
                    <a href={book.volumeInfo.previewLink} target="_blank"><button className='more-button'>More</button></a>
                    <button className='add-button' onClick={AddBook}>Add</button>
                </div>
            </div>
            <h4 className='description'>
                {book.volumeInfo.description}
            </h4>
         </div>
      </div>
    </>
  )
}

export default BookInfoModal
